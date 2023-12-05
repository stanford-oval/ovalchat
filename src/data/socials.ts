import {
  faXTwitter,
  faDiscord,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import { faUserGroup, faGlobe, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const socials = [
  { name: "WikiChat Github", href: "https://github.com/stanford-oval/WikiChat", icon: faGithub },
  { name: "Frontend Github", href: "https://github.com/stanford-oval/ovalchat", icon: faGithub },
  { name: "Website", href: "https://oval.cs.stanford.edu", icon: faGlobe },
  // { name: "Discord", href: "https://discord.gg/anthtR4", icon: faDiscord },
  // {
  //   name: "Community",
  //   href: "https://community.almond.stanford.edu/",
  //   icon: faUserGroup,
  // },
  {
    name: "Twitter",
    href: "https://twitter.com/StanfordOVAL",
    icon: faXTwitter,
  },
  {
    name: "Email",
    href: "mailto:genie@cs.stanford.edu",
    icon: faEnvelope,
  },
];

export default socials;
