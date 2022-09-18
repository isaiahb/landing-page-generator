import { Card, ButtonBase, Box, Container, Typography } from "@mui/material";
import api, { PageI } from "./api";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  ActionIcon,
  Affix,
  Text,
  Transition,
  AppShell,
  Button,
} from "@mantine/core";
import { IconArrowUp } from "@tabler/icons";
import { useWindowScroll } from "@mantine/hooks";
import { IconDots, IconTrash } from "@tabler/icons";
import { useContext, useEffect, useState } from "react";

export function ScrollToTop() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Button
            leftIcon={<IconArrowUp size={16} />}
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
          >
            Scroll to top
          </Button>
        )}
      </Transition>
    </Affix>
  );
}

function Page() {
  const [pages, setPages] = useState<PageI[]>([]);
  const navigate = useNavigate();

  function onDelete(title: string) {
    // remove card from state
    setPages(pages.filter((page: { title: string }) => page.title !== title));
  }

  useEffect(() => {
    async function fetch() {
      try {
        const pages: PageI[] = await api.page.getAll();
        setPages(pages);
      } catch (error) {
        console.error(error);
      }
    }

    fetch();
  }, []);

  async function createNewPage() {
    console.log("create new page clicked!");

    try {
      navigate(`/create/`);
    } catch (error) {
      console.log("Error creating new page:");
      console.log(error);
    }
  }

  return (
    <Box
      style={{
        backgroundColor: "#F8FAFC",
        color: "#000000",
        overflow: "scroll",
      }}
      flexGrow={1}
      height="100vh"
      padding="0"
    >
      <ScrollToTop />
      <Container>
        <Box
          paddingTop="20px"
          display="flex"
          flexDirection={"column"}
          height="calc(100vh - 40px)"
        >
          {/* Documents title, and new Document Button. */}
          <Box display="flex" justifyContent={"space-between"} width="100%">
            <Typography variant="h5" textAlign={"left"}>
              Landing Pages
            </Typography>
            <Button onClick={createNewPage}>New Landing Page</Button>
          </Box>

          {/* List of documents */}
          <Box paddingTop="10px" width={"100%"} flexGrow={1}>
            {
              // pages.sort((a, b)=>{
              //   return a.updatedAt! > b.updatedAt! ? -1 : 1;
              // })
              pages.map((document, index) => {
                return (
                  <Box paddingTop="10px" key={index}>
                    <PageCard page={document} onDelete={onDelete} />
                  </Box>
                );
              })
            }
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function PageCard(props: { page: PageI; onDelete: (id: string) => void }) {
  const page = props.page;
  const navigate = useNavigate();

  async function deleteDocument() {
    try {
      if (!confirm("Are you sure you want to delete this page?")) return;
      if (!page.title) throw new Error("Page Title is undefined");

      await api.page.delete(page.title);
      props.onDelete(page.title!);
    } catch (error) {
      console.log("Error deleting card: \n", error);
    }
  }

  return (
    <Card elevation={1} style={{ display: "flex", alignItems: "center" }}>
      <ButtonBase
        style={{
          flexGrow: 1,
          display: "flex",
          padding: "10px",
        }}
        onClick={() => navigate(`/page/${page.title}`)}
      >
        <Text weight={500}>{page.title}</Text>
        <Box flexGrow={1} />
      </ButtonBase>

      <Box paddingRight={"10px"}>
        <Menu withinPortal position="bottom-end" shadow="sm">
          <Menu.Target>
            <ActionIcon>
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              icon={<IconTrash size={14} />}
              color="red"
              onClick={deleteDocument}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
    </Card>
  );
}

export function AllPages() {
  return <Page />;
}
