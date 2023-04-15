import { ReactNode } from "react"
import { DISCORD_URL, GITHUB_URL, TWITTER_URL } from "../config/links"
import Twitter from "../images/twitter.png";
import Github from "../images/github.png";
import Discord from "../images/discord.png";

const LinkExt = ({ href, children }: { href: string; children: ReactNode; }) =>
  <a rel="noopener noreferrer" target="_blank" href={href}>
    {children}
  </a>
/* {{
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%"
}} */

export const Footer = () => {
  return <div><div className="flat-container footer-container">
    <div className="footer">

      <LinkExt href={TWITTER_URL}><img className="fa" src={Twitter} alt="Twitter logo" /></LinkExt>

      <LinkExt href={DISCORD_URL}><img className="fa" src={Discord} alt="Discord logo" /></LinkExt>

      <LinkExt href={GITHUB_URL}><img className="fa" src={Github} alt="Github logo" /></LinkExt>
    </div>
  </div></div>
}