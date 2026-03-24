import { type DefaultDocumentNodeResolver } from "sanity/structure";
import { Iframe } from "sanity-plugin-iframe-pane";

const SANITY_STUDIO_PREVIEW_URL =
  process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:3000";

// Specify document types that should have preview panes
const previewSchemaTypes = ["page", "post", "contact"];

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  // Add previews for specified schema types
  if (previewSchemaTypes.includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .title("Preview")
        .options({
          url: {
            origin: SANITY_STUDIO_PREVIEW_URL,
            preview: (doc: any) => {
              let path = "/";

              if (doc._type === "page") {
                const slug = doc.slug?.current;
                if (slug === "index") {
                  path = "/";
                } else {
                  path = slug ? `/${slug}` : "/";
                }
              } else if (doc._type === "post") {
                const slug = doc.slug?.current;
                path = slug ? `/blog/${slug}` : "/blog";
              } else if (doc._type === "contact") {
                path = "/contact";
              }

              // Add iframe parameter to distinguish from presentation mode
              return `${path}?iframe=true`;
            },
            draftMode: "/api/draft-mode/enable",
          },
          defaultSize: "desktop",
          reload: {
            button: true,
          },
        }),
    ]);
  }

  // Return default views for other document types
  return S.document().views([S.view.form()]);
};
