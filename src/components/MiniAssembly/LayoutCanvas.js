import { useState, useEffect, useContext, useRef } from "react";

import printContext from "../../printContext.js";
import missingImage from "../../../images/missing.png";

import {
  getCreatureImageByName,
  getCreatureImageById,
} from "../../dataGetter.js";

const LayoutCanvas = (props) => {
  const [printList] = useContext(printContext);
  const [imageList, setImageList] = useState(new Map());
  const [imagesLoaded, setImagesLoaded] = useState(false);
  imageList.set("missing", missingImage);

  getImages();

  const canvasRef = useRef(null);

  async function drawMinis() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    let miniLocation = { x: 0, y: 0 };
    let imageDimensions = { x: 100, y: 100 };
    let miniDimensions = imageDimensions;

    await printList.creatures.map(async (creature) => {
      for (let i = 0; i < creature.count; i++) {
        console.log(`drawing mini for ${creature.id}`);
        drawMini(
          context,
          creature.id,
          miniLocation.x,
          miniLocation.y,
          imageDimensions.x,
          imageDimensions.y
        );
        miniLocation.x += miniDimensions.x;
        if (miniLocation.x + miniDimensions.x > context.canvas.width) {
          miniLocation.x = 0;
          miniLocation.y += miniDimensions.y;
        }
      }
    });
  }

  async function drawMini(
    context,
    imageId,
    startX,
    startY,
    imageWidth,
    imageHeight
  ) {
    console.log(`startX: ${startX}  startY: ${startY}`);
    // let frontImage = imageList.get(imageId);
    let frontImage = await document.getElementById(`hiddenImage${imageId}`);
    console.log(frontImage);

    if (frontImage) {
      context.drawImage(frontImage, startX, startY, imageWidth, imageHeight);
    }
  }

  useEffect(() => {
    drawMinis();
  }, [imagesLoaded]);

  async function getImages() {
    await printList.creatures.map(async (creature) => {
      if (!imageList.has(creature.id)) {
        await setImageList(
          new Map(
            await imageList.set(
              creature.id,
              await getCreatureImageById(creature.id)
            )
          )
        );
      }
    });
    setImagesLoaded(true);
  }

  /* full size is 2400 x 3300 */

  return (
    <span>
      {imagesLoaded
        ? [...imageList.keys()].map((creatureImage) => (
            <img
              src={imageList.get(creatureImage)}
              id={`hiddenImage${creatureImage}`}
              key={creatureImage}
              hidden="hidden"
            />
          ))
        : null}
      <canvas ref={canvasRef} id="workTable" width="850" height="1100" />
    </span>
  );
};

export default LayoutCanvas;
