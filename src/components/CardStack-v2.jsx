import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import move from "lodash-move";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";

const cardContents = [
  {
    cardNumber: 1,
    title: "Card 1",
    header: (
      <>
        <p className="text-tiny uppercase font-bold">Weekly Playlist</p>
        <small className="text-default-500">20 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </>
    ),
    body: (
      <>
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://images.pexels.com/photos/3846224/pexels-photo-3846224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          width={270}
        />
        <p className="mt-3">
          This is Card 1, Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Aliquid quibusdam similique temporibus, voluptates unde
          assumenda aspernatur dolore voluptatem quia illum voluptate error iure
          itaque dolor optio dolores blanditiis, inventore hic!
        </p>
      </>
    ),
  },
  {
    cardNumber: 2,
    title: "Card 2",
    header: (
      <>
        <p className="text-tiny uppercase font-bold">Weekly Playlist</p>
        <small className="text-default-500">20 Tracks</small>
        <h4 className="font-bold text-large">Backend Beats</h4>
      </>
    ),
    body: (
      <>
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://images.pexels.com/photos/631477/pexels-photo-631477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          width={270}
        />
        <p className="mt-3">
          This is Card 2, Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Aliquid quibusdam similique temporibus, voluptates unde
          assumenda aspernatur dolore voluptatem quia illum voluptate error iure
          itaque dolor optio dolores blanditiis, inventore hic!
        </p>
      </>
    ),
  },
  {
    cardNumber: 3,
    title: "Card 3",
    header: (
      <>
        <p className="text-tiny uppercase font-bold">Weekly Playlist</p>
        <small className="text-default-500">20 Tracks</small>
        <h4 className="font-bold text-large">Fullstack Beats</h4>
      </>
    ),
    body: (
      <>
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://images.pexels.com/photos/2500220/pexels-photo-2500220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          width={270}
        />
        <p className="mt-3">
          This is Card 3, Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Aliquid quibusdam similique temporibus, voluptates unde
          assumenda aspernatur dolore voluptatem quia illum voluptate error iure
          itaque dolor optio dolores blanditiis, inventore hic!
        </p>
      </>
    ),
  },
];

function CardStackV2() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [cards, setCards] = useState(cardContents);
  const [ulHeight, setUlHeight] = useState(0);
  const cardRefs = useRef([]);
  const moveToEnd = (from) => {
    console.log("moved");
    setCards(move(cards, from, cards.length - 1));
  };

  const animationVariation = {
    top: {
      rotate: [0, 5, 0],
      y: [0, (ulHeight + 20) * -1, 0],
      "z-index": [5, 0, 0],
    },
    else: {
      rotate: [0, 5, 0],
      y: [0, 40, 0],
    },
    still: {},
  };

  useEffect(() => {
    const maxCardHeight = cardRefs.current.reduce((max, cardRef) => {
      return cardRef.offsetHeight > max ? cardRef.offsetHeight : max;
    }, 0);
    setUlHeight(maxCardHeight);
  }, [cards]);

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      moveToEnd(0);
    }, 2000);
  };

  return (
    <div>
      <ul
        className="relative"
        style={{ width: "calc(0.9 * 100vw)", height: `${ulHeight}px` }}
      >
        {cards.map((card, index) => {
          return (
            <motion.li
              ref={(el) => (cardRefs.current[index] = el)}
              key={card.cardNumber}
              animate={{
                "z-index": [cards.length - index],
                ...animationVariation[
                  index === 0 && isAnimating
                    ? "top"
                    : isAnimating
                    ? "else"
                    : "still"
                ],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
              className="absolute h-auto"
            >
              <Card className="py-4 w-full">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  {card.header}
                </CardHeader>
                <CardBody className="overflow-visible py-2 flex justify-center">
                  {card.body}
                </CardBody>
              </Card>
            </motion.li>
          );
        })}
      </ul>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
      >
        <Button
          className="mt-5 shadow-lg"
          color="primary"
          size="lg"
          onClick={() => handleClick()}
        >
          Next
        </Button>
      </motion.div>
    </div>
  );
}

export default CardStackV2;
