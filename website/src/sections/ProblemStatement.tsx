import Typography from "@mui/material/Typography";
import { Container, Box } from "@mui/material";

export function ProblemStatementPage(props: {
  problemStatement: string;
  solutionStatment: string;
  bgcolor?: string;
}) {
  const { problemStatement, solutionStatment } = props;

  return (
    <Box width={"100vw"} minHeight="80vh" bgcolor={props.bgcolor ?? "#F5F5F5"}>
      <Container maxWidth="lg">
        <Box
          width="100%"
          paddingTop={"150px"}
          display="flex"
          flexDirection={"column"}
        >
          <Typography  fontSize={36} paddingTop="15px" textAlign={"left"}>
            {problemStatement}
          </Typography>

          <Typography paddingTop="20px" textAlign={"left"}>
            {solutionStatment}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}