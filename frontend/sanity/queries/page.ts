import { groq } from "next-sanity";
import { metaQuery } from "./shared/meta";
import { hero1Query } from "./hero/hero-1";
import { hero2Query } from "./hero/hero-2";
import { sectionHeaderQuery } from "./section-header";
import { splitRowQuery } from "./split/split-row";
import { gridRowQuery } from "./grid/grid-row";
import { carousel1Query } from "./carousel/carousel-1";
import { carousel2Query } from "./carousel/carousel-2";
import { timelineQuery } from "./timeline";
import { cta1Query } from "./cta/cta-1";
import { community1Query } from "./community/community-1";
import { logoCloud1Query } from "./logo-cloud/logo-cloud-1";
import { trustStrip1Query } from "./trust-strip/trust-strip-1";
import { about3Query } from "./about/about-3";
import { footer2Query } from "./footer/footer-2";
import { faqsQuery } from "./faqs";
import { formNewsletterQuery } from "./forms/newsletter";
import { allPostsQuery } from "./all-posts";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    blocks[]{
      ${hero1Query},
      ${hero2Query},
      ${sectionHeaderQuery},
      ${splitRowQuery},
      ${gridRowQuery},
      ${carousel1Query},
      ${carousel2Query},
      ${timelineQuery},
      ${cta1Query},
      ${community1Query},
      ${logoCloud1Query},
      ${trustStrip1Query},
      ${about3Query},
      ${footer2Query},
      ${faqsQuery},
      ${formNewsletterQuery},
      ${allPostsQuery},
    },
    ${metaQuery},
  }
`;

export const PAGES_SLUGS_QUERY = groq`*[_type == "page" && defined(slug)]{slug}`;
