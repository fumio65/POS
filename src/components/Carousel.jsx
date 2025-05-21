import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import axios from "axios";

const CARD_WIDTH = 208;
const GAP = 20;
const CARD_FULL_WIDTH = CARD_WIDTH + GAP;
const NUM_COPIES = 3;

export default function Carousel({ onSelectUser }) {
  const parentRef = useRef(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRafRef = useRef(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users/");
        const fetchedProfiles = response.data.results || response.data;
        setProfiles(fetchedProfiles);
        
        // Set initial selected user
        if (fetchedProfiles.length > 0) {
          const initialCenterIndex = Math.floor(fetchedProfiles.length / 2);
          onSelectUser(fetchedProfiles[initialCenterIndex]);
        }
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [onSelectUser]);

  const singleListLength = profiles.length;
  const loopProfiles = [...profiles, ...profiles, ...profiles];
  const totalLength = loopProfiles.length;
  const MIDDLE = singleListLength * Math.floor(NUM_COPIES / 2);

  useEffect(() => {
    if (singleListLength > 0) {
      setCurrentIndex(MIDDLE);
    }
  }, [singleListLength, MIDDLE]);

  const detectCenterCard = () => {
    const parent = parentRef.current;
    if (!parent) return;

    const parentCenter = parent.offsetWidth / 2;
    const children = parent.querySelectorAll(".profile-card");
    let closestIdx = 0;
    let closestDistance = Infinity;

    children.forEach((child, idx) => {
      const box = child.getBoundingClientRect();
      const cardCenter = box.left + box.width / 2 - parent.getBoundingClientRect().left;
      const distance = Math.abs(parentCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIdx = idx;
      }
    });

    setCurrentIndex(closestIdx);
    const actualIdx = closestIdx % singleListLength;
    onSelectUser(profiles[actualIdx]);
  };

  useLayoutEffect(() => {
    const parent = parentRef.current;
    if (!parent || singleListLength === 0) return;

    const initialScrollLeft = singleListLength * CARD_FULL_WIDTH;
    parent.scrollLeft = initialScrollLeft;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        detectCenterCard();
      });
    });
  }, [singleListLength]);

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent || singleListLength === 0) return;

    const handleScroll = () => {
      const scrollLeft = parent.scrollLeft;
      const maxScrollLeft = parent.scrollWidth - parent.clientWidth;

      if (scrollLeft <= 1) {
        parent.scrollLeft = scrollLeft + singleListLength * CARD_FULL_WIDTH;
      } else if (scrollLeft >= maxScrollLeft - 1) {
        parent.scrollLeft = scrollLeft - singleListLength * CARD_FULL_WIDTH;
      }

      if (!scrollRafRef.current) {
        scrollRafRef.current = requestAnimationFrame(() => {
          detectCenterCard();
          scrollRafRef.current = null;
        });
      }
    };

    parent.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      parent.removeEventListener("scroll", handleScroll);
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, [singleListLength]);

  const handleCardClick = (clickedIdx) => {
    const parent = parentRef.current;
    if (!parent) return;

    const children = parent.querySelectorAll(".profile-card");
    const targetCard = children[clickedIdx];
    if (!targetCard) return;

    targetCard.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

    setTimeout(() => {
      detectCenterCard();
    }, 500);
  };

  if (loading) return <div className="text-white">Loading profiles...</div>;
  if (profiles.length === 0) return <div className="text-white">No profiles to display.</div>;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        ref={parentRef}
        className="rounded-lg overflow-x-auto scrollbar-hide select-none snap-x"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div
          className="flex gap-4 px-5 py-6"
          style={{ width: CARD_FULL_WIDTH * totalLength }}
        >
          {loopProfiles.map((p, idx) => {
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
                style={{ cursor: "pointer", willChange: "transform" }}
              >
                <img
                  src={p.profile_url || "/images/default-profile.png"}
                  alt={p.names}
                  className="w-25 h-25 border-4 border-white rounded-full mx-auto mb-4 object-cover"
                />
                <div className="text-white font-bold">{p.names}</div>
                <div className="text-sm text-gray-500">{p.role}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}