import React, { Suspense } from "react";
import { Typography } from "../components/style/Typography_styled";
import { Flex } from "../components/style/Flex_styled"; // Assuming you have a Flex component

export const AdminDashboard = () => {
  return (
    <>
      <Suspense>
        <Typography fontSize="bodySubTitleFontSize" fontWeight="bold">
          Admin dashboard
        </Typography>
        <Flex row>
          <Flex md={6}>
            {/* Embed a live video in the iframe with autoplay */}
            <iframe
              width="100%" // Full width
              height="500px" // Set height
               src="https://www.youtube.com/embed/BJ3Yv572V1A?autoplay=1&mute=1"
              title="Live Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Flex>
          <Flex md={6}>
            {/* Embed a live video in the iframe with autoplay */}
            <iframe
              width="100%" // Full width
              height="500px" // Set height
               src="https://www.youtube.com/embed/UTmuSHNthuc?autoplay=1&mute=1"
              title="Live Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Flex>
        </Flex>
      </Suspense>
    </>
  );
};
