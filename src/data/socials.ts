import {
  faTwitter,
  faDiscord,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import { faUserGroup, faGlobe } from "@fortawesome/free-solid-svg-icons";

const socials = [
  { name: "Website", href: "https://oval.cs.stanford.edu", icon: faGlobe },
  { name: "Github", href: "https://github.com/stanford-oval/noora", icon: faGithub },
  { name: "Discord", href: "https://discord.gg/anthtR4", icon: faDiscord },
  {
    name: "Community",
    href: "https://community.almond.stanford.edu/",
    icon: faUserGroup,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/StanfordOVAL",
    icon: faTwitter,
  },
];

export default socials;
