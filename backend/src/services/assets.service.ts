import path from 'path';
import fs from 'fs';
import cohere from "../connections/cohere.client";

//joining path of directory 
const directoryPath = path.join(__dirname, '..', 'assets');
export const fileNames: string[] = [];
const embeddings: number[][] = [];


//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
        fileNames.push(file);
    });
    console.log(fileNames);

    // Generate embeds for each file.
    (async () => {
      const response = await cohere.embed({
        texts: fileNames,
      });
      response.body.embeddings.forEach((embedding: number[]) => {
        embeddings.push(embedding);
      });
      // console.log(`Embeddings: ${embeddings}`);
      console.log("Files length: " + fileNames.length);
      console.log(`Embeddings Length: ${embeddings.length}`);

    })();
});

function getDistance(embedding1: number[], embedding2: number[]): number {
  // Get the distance between two embeddings.
  let distance = 0;
  for (let i = 0; i < embedding1.length; i++) {
    distance += Math.pow(embedding1[i] - embedding2[i], 2);
  }
  return Math.sqrt(distance);
}

export async function getClosestEmbeddingFileName(text: string): Promise<string> {
  // Get the closest file name to the given text.
  const response = await cohere.embed({
    texts: [text],
  });
  const embedding = response.body.embeddings[0];
  let closestEmbeddingIndex = 0;
  for (let i = 0; i < embeddings.length; i++) {
    const currentEmbedding = embeddings[i];
    const closestEmbedding = embeddings[closestEmbeddingIndex];
    const currentDistance = getDistance(embedding, currentEmbedding);
    const closestDistance = getDistance(embedding, closestEmbedding);
    if (currentDistance < closestDistance) {
      closestEmbeddingIndex = i;
    }
  }
  return fileNames[closestEmbeddingIndex] ?? "";
}
