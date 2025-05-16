import React, { useEffect, useRef, useState, useLayoutEffect } from "react";

import profiles from "../data/profiles";

const CARD_WIDTH = 208;
const GAP = 20;
const CARD_FULL_WIDTH = CARD_WIDTH + GAP;
const NUM_COPIES = 3;
const MIDDLE = profiles.length * Math.floor(NUM_COPIES / 2);

export default function Carousel() {
  const parentRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(MIDDLE);
  const scrollRafRef = useRef(null); // Ref to store requestAnimationFrame ID for scroll settling

  const loopProfiles = [...profiles, ...profiles, ...profiles];
  const singleListLength = profiles.length;
  const totalLength = loopProfiles.length;

  // Function to detect and update center card
  const detectCenterCard = () => {
    const parent = parentRef.current;
    if (!parent) return;

    const parentCenter = parent.offsetWidth / 2;
    const children = parent.querySelectorAll(".profile-card");
    let closestIdx = 0;
    let closestDistance = Infinity;

    children.forEach((child, idx) => {
      const box = child.getBoundingClientRect();
      // Calculate the center of the card relative to the parent's left edge
      const cardCenter = box.left + box.width / 2 - parent.getBoundingClientRect().left;
      const distance = Math.abs(parentCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIdx = idx;
      }
    });

    setCurrentIndex(closestIdx);
  };

  // Ensure that the scroll position and center detection are done after mount
  useLayoutEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    // Set the initial scroll position to the middle of the profiles array copy
    const initialScrollLeft = singleListLength * CARD_FULL_WIDTH;
    parent.scrollLeft = initialScrollLeft;

    // Use requestAnimationFrame to wait for the browser to process the scroll
    requestAnimationFrame(() => {
      // Use another requestAnimationFrame to wait for the subsequent paint.
      requestAnimationFrame(() => {
        detectCenterCard();
      });
    });
  }, [singleListLength]); // Dependency on singleListLength

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    const handleScroll = () => {
      const scrollLeft = parent.scrollLeft;
      const maxScrollLeft = parent.scrollWidth - parent.clientWidth;

      // Infinite scroll logic
      // Add a small tolerance (e.g., 1 pixel) for floating point inaccuracies
      if (scrollLeft <= 1) {
        parent.scrollLeft = scrollLeft + singleListLength * CARD_FULL_WIDTH;
      } else if (scrollLeft >= maxScrollLeft - 1) {
        parent.scrollLeft = scrollLeft - singleListLength * CARD_FULL_WIDTH;
      }

      // Detect the center card after a small delay or on scroll settle
      if (!scrollRafRef.current) { // Only detect if not currently in a smooth scroll check loop
        // Set a slight delay for detecting center card after the scroll event
        scrollRafRef.current = requestAnimationFrame(() => {
          detectCenterCard();
          scrollRafRef.current = null;
        });
      }
    };

    // Use passive: true for better scroll performance
    parent.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      parent.removeEventListener("scroll", handleScroll);
      // Clean up any pending scroll settling check
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, [singleListLength]); // Dependency on singleListLength

  const handleCardClick = (clickedIdx) => {
    const parent = parentRef.current;
    if (!parent) return;

    const children = parent.querySelectorAll(".profile-card");

    // Ensure the clicked index is valid
    const targetCard = children[clickedIdx];
    if (!targetCard) return;

    // Perform the smooth scroll directly to the center of the clicked card
    targetCard.scrollIntoView({
      behavior: "smooth",
      block: "nearest", // Ensure it scrolls into view without causing unnecessary movement
      inline: "center", // Align the card at the center
    });

    // After scrolling, detect the center card
    const settleTimer = setTimeout(() => {
      detectCenterCard();
    }, 500); // Add a small delay to let the scroll settle before detecting the new center card
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        ref={parentRef}
        className="rounded-lg overflow-x-auto scrollbar-hide select-none snap-x"
        style={{ WebkitOverflowScrolling: "touch" }} // For smoother scrolling on iOS
      >
        <div
          className="flex gap-4 px-5 py-6 "
          style={{ width: CARD_FULL_WIDTH * totalLength }}
        >
          {loopProfiles.map((p, idx) => {
            // Add snap-center to the card to work with snap-x on the parent
            const isCenterCard = idx === currentIndex;
            return (
              <div
                key={idx}
                className={`profile-card flex-shrink-0 w-52 rounded-md text-center snap-center ${
                  isCenterCard
                    ? "scale-110 transition-transform duration-300 ease-in-out"
                    : "transition-transform duration-300 ease-in-out"
                }`}
                onClick={() => handleCardClick(idx)}
                style={{ cursor: "pointer", willChange: "transform" }} // Adding will-change to improve performance
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-25 h-25 border-4 border-white rounded-full mx-auto mb-4 object-cover"
                />
                <div className="text-white font-bold">{p.name}</div>
                <div className="text-sm text-gray-500">{p.role}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
