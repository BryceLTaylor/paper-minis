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

    let pixelsPerInch = 100;

    await printList.creatures.map(async (creature) => {
      let creatureSize = creature.creatureInfo.size;
      console.log(creatureSize);
      for (let i = 0; i < creature.count; i++) {
        let baseSize, standHeight;
        switch (creatureSize) {
          case "large":
            baseSize = 2;
            standHeight = 2.5;
            break;
          case "huge":
            baseSize = 3;
            standHeight = 4;
            break;
          case "medium":
            baseSize = 1;
            standHeight = 1.5;
            break;
          case "small":
            baseSize = 1;
            standHeight = 1.5; // later maybe make this smaller
          default:
            baseSize = 1;
            standHeight = 1.5;
            break;
        }
        let miniDimensions = {
          x: baseSize * pixelsPerInch,
          y: (baseSize * 2 + standHeight * 2) * pixelsPerInch,
        };

        drawMini(
          context,
          creature.id,
          miniLocation.x,
          miniLocation.y,
          baseSize * pixelsPerInch, // imageWidth
          baseSize * pixelsPerInch, // imageHeight
          baseSize * pixelsPerInch,
          standHeight * pixelsPerInch
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
    imageHeight,
    baseSize,
    standHeight
  ) {
    let frontImage = await document.getElementById(`hiddenImage${imageId}`);

    let dashes = [5, 5];
    if (frontImage) {
      context.setLineDash([]);

      context.beginPath();
      //top line
      context.moveTo(startX, startY);
      context.lineTo(startX + baseSize, startY);

      // right line
      context.lineTo(
        startX + baseSize,
        startY + (2 * baseSize + 2 * standHeight)
      );
      // bottom line
      context.lineTo(startX, startY + (2 * baseSize + 2 * standHeight));
      //left line
      context.lineTo(startX, startY);
      context.stroke();

      //horizontal lines
      context.beginPath();
      context.setLineDash(dashes);
      context.moveTo(startX, startY + 0.5 * baseSize);
      context.lineTo(startX + baseSize, startY + 0.5 * baseSize);
      context.stroke();
      context.setLineDash([]);

      context.setLineDash(dashes);
      context.moveTo(startX, startY + 0.5 * baseSize + standHeight);
      context.lineTo(startX + baseSize, startY + 0.5 * baseSize + standHeight);

      context.moveTo(startX, startY + 0.5 * baseSize + 2 * standHeight);
      context.lineTo(
        startX + baseSize,
        startY + 0.5 * baseSize + 2 * standHeight
      );

      context.moveTo(startX, startY + baseSize + 2 * standHeight);
      context.lineTo(startX + baseSize, startY + baseSize + 2 * standHeight);

      context.stroke();

      context.setLineDash([]);

      //draw upside down image
      context.save();
      context.translate(
        startX + imageWidth / 2,
        startY +
          imageHeight / 2 +
          baseSize / 2 +
          (standHeight - imageHeight) / 2
      );
      context.rotate(Math.PI);
      context.translate(
        -(startX + imageWidth / 2),
        -(
          startY +
          imageHeight / 2 +
          baseSize / 2 +
          (standHeight - imageHeight) / 2
        )
      );
      context.drawImage(
        frontImage,
        startX,
        startY + 0.5 * baseSize + (standHeight - imageHeight) / 2,
        imageWidth,
        imageHeight
      );
      context.rotate(-Math.PI);
      context.restore();

      //draw right side up image
      context.drawImage(
        frontImage,
        startX,
        startY + 0.5 * baseSize + standHeight + (standHeight - imageHeight) / 2,
        imageWidth,
        imageHeight
      );
    }
  }

  useEffect(() => {
    drawMinis();
  }, [imagesLoaded, printList]);

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
