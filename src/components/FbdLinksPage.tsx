import * as React from "react";

import { ImportantLinks } from "../config/links";
import Twitter from "../images/twitter.png";
import Github from "../images/github.png";
import Discord from "../images/discord.png";

const LinkExt = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a rel="noopener noreferrer" target="_blank" href={href}>
    {children}
  </a>
);

export const FbdLinksPage = () => {
  return (
    <div>
      <div
        className="gen-container center-insides lightly-padded"
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {ImportantLinks.map(({ url, name, image }) => {
          return (
            <h1
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                justifyItems: "center",
                justifySelf: "center",
                justifyContent: "flex-start",
                width: "40%",
              }}
            >
              {name}
              <LinkExt href={url}>
                <img
                  className="fa"
                  src={image}
                  alt={name}
                  style={{ width: 100, height: 100 }}
                />
              </LinkExt>
            </h1>
          );
        })}
      </div>
    </div>
  );
};
