"use server"; // Add this at the top for Server Actions

import { Resend } from "resend";
import * as React from "react";
import { render } from "@react-email/render"; // Import render from @react-email/render
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Img,
  Button,
  Heading,
  Section,
  Hr,
  Column,
  Row,
  Link, // Add Link for social links and other interactive elements
} from "@react-email/components";

// Ensure your Resend API Key is set in your environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the structure of your UI components as received from the frontend
interface EmailComponentData {
  id: string;
  type: string;
  content: string;
  props?: any;
}

interface EmailMetaData {
  from: string;
  to: string; // Comma-separated string of recipient emails
  subject: string;
  previewText: string;
}

interface SendEmailPayload {
  meta: EmailMetaData;
  blocks: EmailComponentData[];
}

// Helper function to render a single React Email component based on type
const renderReactEmailComponent = (block: EmailComponentData) => {
  // Base styles to ensure consistency and email client compatibility
  const commonStyles = {
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
    color: "#333",
    lineHeight: "1.5",
  };

  // Styles for common elements
  const textStyle = { ...commonStyles, fontSize: "16px", marginBottom: "10px" };
  const buttonBaseStyle = {
    backgroundColor: "#000",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "6px",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
  };
  const imageBaseStyle = {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "8px",
    display: "block",
    margin: "0 auto", // Center images
  };
  const listBaseStyle = {
    ...commonStyles,
    fontSize: "16px",
    lineHeight: "24px",
    paddingLeft: "20px",
    marginBottom: "10px",
  };

  switch (block.type) {
    case "text":
      return <Text style={textStyle}>{block.content}</Text>;
    case "heading1":
      return (
        <Heading
          as="h1"
          style={{
            ...commonStyles,
            fontSize: "32px",
            lineHeight: "36px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          {block.content}
        </Heading>
      );
    case "heading2":
      return (
        <Heading
          as="h2"
          style={{
            ...commonStyles,
            fontSize: "24px",
            lineHeight: "28px",
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          {block.content}
        </Heading>
      );
    case "heading3":
      return (
        <Heading
          as="h3"
          style={{
            ...commonStyles,
            fontSize: "20px",
            lineHeight: "24px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          {block.content}
        </Heading>
      );
    case "image":
      return (
        <Img
          src={
            block.content ||
            "https://via.placeholder.com/400x200.png?text=Placeholder+Image"
          }
          width={block.props?.width || "100%"}
          alt={block.props?.alt || "Image"}
          style={imageBaseStyle}
        />
      );
    case "button":
      return (
        <Section style={{ textAlign: "center", margin: "20px 0" }}>
          <Button href={block.props?.href || "#"} style={buttonBaseStyle}>
            {block.content}
          </Button>
        </Section>
      );
    case "bulletList":
      return (
        <ul style={{ ...listBaseStyle, listStyleType: "disc" }}>
          {block.content.split("\n").map((item, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              {item.replace("• ", "")}
            </li>
          ))}
        </ul>
      );
    case "numberedList":
      return (
        <ol style={{ ...listBaseStyle, listStyleType: "decimal" }}>
          {block.content.split("\n").map((item, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              {item.replace(/^\d+\.\s/, "")}
            </li>
          ))}
        </ol>
      );
    case "divider":
      return <Hr style={{ borderColor: "#eee", margin: "20px 0" }} />;
    case "youtubeVideo":
      return (
        <Section style={{ textAlign: "center", padding: "20px 0" }}>
          <Link href={block.props?.url} style={{ textDecoration: "none" }}>
            <Img
              src={
                block.props?.thumbnail ||
                `https://img.youtube.com/vi/${
                  block.props?.url?.split("v=")[1]?.split("&")[0]
                }/hqdefault.jpg`
              }
              alt={block.props?.alt || "YouTube Video Thumbnail"}
              width="560" // Standard YouTube embed width for emails
              height="315" // Standard YouTube embed height for emails
              style={imageBaseStyle}
            />
          </Link>
          <Text
            style={{
              ...commonStyles,
              fontSize: "14px",
              color: "#666",
              marginTop: "10px",
            }}
          >
            Click image to watch video
          </Text>
        </Section>
      );
    case "pricingCard":
      return (
        <Section
          style={{
            padding: "20px",
            border: "1px solid #eee",
            borderRadius: "8px",
            textAlign: "center",
            margin: "20px 0",
          }}
        >
          <Heading
            as="h3"
            style={{
              ...commonStyles,
              fontSize: "28px",
              marginBottom: "10px",
              fontWeight: "bold",
            }}
          >
            {block.content}
          </Heading>
          <Text
            style={{
              ...commonStyles,
              fontSize: "40px",
              fontWeight: "bold",
              color: "#4F46E5",
              margin: "0 0 20px",
            }}
          >
            {block.props?.price}
          </Text>
          <ul
            style={{
              ...commonStyles,
              listStyle: "none",
              padding: "0",
              margin: "0 0 20px",
            }}
          >
            {block.props?.features?.map((feature: string, index: number) => (
              <li
                key={index}
                style={{ marginBottom: "8px", fontSize: "16px", color: "#555" }}
              >
                <span style={{ color: "#22C55E", marginRight: "8px" }}>
                  &#10003;
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <Button
            href={block.props?.buttonHref || "#"}
            style={{
              backgroundColor: "#4F46E5",
              color: "#fff",
              padding: "15px 30px",
              borderRadius: "8px",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {block.props?.buttonText}
          </Button>
        </Section>
      );
    case "socialLinks":
      return (
        <Section
          style={{
            textAlign: "center",
            padding: "20px 0",
            marginBottom: "20px",
          }}
        >
          <Text
            style={{ ...textStyle, marginBottom: "15px", fontWeight: "bold" }}
          >
            {block.content}
          </Text>
          {block.props?.links?.map(
            (
              link: { platform: string; url: string; iconUrl: string },
              index: number
            ) => (
              <span
                key={index}
                style={{ margin: "0 10px", display: "inline-block" }}
              >
                <Link href={link.url} style={{ textDecoration: "none" }}>
                  <Img
                    src={link.iconUrl}
                    width="32"
                    height="32"
                    alt={link.platform}
                    style={{ verticalAlign: "middle" }}
                  />
                </Link>
              </span>
            )
          )}
        </Section>
      );
    case "codeBlock":
      return (
        <Section
          style={{
            padding: "15px",
            backgroundColor: "#f6f8fa",
            borderRadius: "4px",
            margin: "20px 0",
          }}
        >
          <Text
            style={{
              fontFamily: "monospace",
              fontSize: "14px",
              lineHeight: "20px",
              whiteSpace: "pre-wrap",
              margin: "0",
            }}
          >
            {block.content}
          </Text>
        </Section>
      );
    case "section":
      return (
        <Section
          style={{
            border: "1px dashed #4299e1",
            padding: "20px",
            borderRadius: "8px",
            margin: "20px 0",
          }}
        >
          <Text
            style={{
              fontSize: "14px",
              color: "#4299e1",
              margin: "0 0 10px",
              fontWeight: "bold",
            }}
          >
            {block.content}
          </Text>
          <Text style={{ fontSize: "12px", color: "#666" }}>
            (This is a generic section. Content for the section would typically
            be rendered here based on nested blocks, if your editor supported
            nesting.)
          </Text>
        </Section>
      );
    case "productCard":
      return (
        <Section
          style={{
            padding: "20px",
            border: "1px solid #eee",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <Column style={{ width: "30%", marginRight: "20px" }}>
            <Img
              src={
                block.props?.imageUrl ||
                "https://via.placeholder.com/100x100.png?text=Product+Image"
              }
              width="100"
              height="100"
              alt={block.content}
              style={{ borderRadius: "8px", objectFit: "cover" }}
            />
          </Column>
          <Column style={{ width: "70%" }}>
            <Heading
              as="h4"
              style={{
                ...commonStyles,
                fontSize: "20px",
                margin: "0 0 5px",
                fontWeight: "bold",
              }}
            >
              {block.content}
            </Heading>
            <Text
              style={{
                ...commonStyles,
                fontSize: "15px",
                lineHeight: "22px",
                color: "#666",
                margin: "0 0 10px",
              }}
            >
              {block.props?.description}
            </Text>
            <Text
              style={{
                ...commonStyles,
                fontSize: "18px",
                fontWeight: "bold",
                margin: "0 0 15px",
              }}
            >
              {block.props?.price}
            </Text>
            <Button
              href={block.props?.buttonHref || "#"}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "15px",
              }}
            >
              {block.props?.buttonText}
            </Button>
          </Column>
        </Section>
      );
    case "twoColumnProductCards":
      return (
        <Section style={{ margin: "20px 0" }}>
          <Row>
            {block.props?.products?.map((product: any, index: number) => (
              <Column
                key={index}
                style={{
                  width: "48%",
                  padding: "10px",
                  margin: index % 2 === 0 ? "0 2% 20px 0" : "0 0 20px 2%",
                }}
              >
                <Section
                  style={{
                    border: "1px solid #eee",
                    borderRadius: "8px",
                    padding: "15px",
                    textAlign: "center",
                  }}
                >
                  <Img
                    src={
                      product.imageUrl ||
                      "https://via.placeholder.com/80x80.png?text=Product"
                    }
                    width="80"
                    height="80"
                    alt={product.name}
                    style={{
                      borderRadius: "8px",
                      objectFit: "cover",
                      marginBottom: "10px",
                    }}
                  />
                  <Heading
                    as="h5"
                    style={{
                      ...commonStyles,
                      fontSize: "18px",
                      margin: "0 0 5px",
                      fontWeight: "bold",
                    }}
                  >
                    {product.name}
                  </Heading>
                  <Text
                    style={{
                      ...commonStyles,
                      fontSize: "13px",
                      lineHeight: "18px",
                      color: "#666",
                      margin: "0 0 10px",
                    }}
                  >
                    {product.description}
                  </Text>
                  <Text
                    style={{
                      ...commonStyles,
                      fontSize: "16px",
                      fontWeight: "bold",
                      margin: "0 0 15px",
                    }}
                  >
                    {product.price}
                  </Text>
                  <Button
                    href={product.buttonHref || "#"}
                    style={{
                      backgroundColor: "#28a745",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      textDecoration: "none",
                      display: "inline-block",
                      fontSize: "13px",
                    }}
                  >
                    {product.buttonText}
                  </Button>
                </Section>
              </Column>
            ))}
          </Row>
        </Section>
      );
    default:
      return null;
  }
};

// React Email Template Component
function NewsletterEmail({ meta, blocks }: SendEmailPayload) {
  return (
    <Html lang="en">
      <Head>
        <title>{meta.subject}</title>
        {meta.previewText && (
          <meta name="description" content={meta.previewText} />
        )}
      </Head>
      <Body
        style={{
          margin: "0",
          padding: "0",
          backgroundColor: "#f6f9fc",
          width: "100%",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "600px",
            margin: "30px auto",
          }}
        >
          {blocks.map((block) => (
            <React.Fragment key={block.id}>
              {renderReactEmailComponent(block)}
            </React.Fragment>
          ))}
        </Container>
      </Body>
    </Html>
  );
}

// Next.js App Router API Route handler
// export async function POST(request: Request) {
//   try {
//     const payload: SendEmailPayload = await request.json();
//     const { meta, blocks } = payload;

//     // Validate incoming data
//     if (!meta.subject || !meta.to || !meta.from) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Missing required email metadata (subject, to, or from).",
//         },
//         { status: 400 }
//       );
//     }
//     if (!blocks || blocks.length === 0) {
//       return NextResponse.json(
//         { success: false, message: "No content blocks provided." },
//         { status: 400 }
//       );
//     }

//     // Render the React Email component to HTML string
//     const emailHtml = render(<NewsletterEmail meta={meta} blocks={blocks} />, {
//       pretty: true,
//     });

//     // Send the email using Resend
//     const { data, error } = await resend.emails.send({
//       from: meta.from,
//       to: meta.to.split(",").map((email) => email.trim()), // Supports multiple recipients
//       subject: meta.subject,
//       html: emailHtml,
//       // text: "Plain text version of your email goes here (optional but good for deliverability)",
//     });

//     if (error) {
//       console.error("Resend error:", error);
//       return NextResponse.json(
//         { success: false, message: error.message },
//         { status: 500 }
//       );
//     }

//     console.log("Email sent successfully:", data);
//     return NextResponse.json({ success: true, data }, { status: 200 });
//   } catch (err: any) {
//     console.error("Server processing error:", err);
//     return NextResponse.json(
//       {
//         success: false,
//         message: err.message || "An unexpected error occurred.",
//       },
//       { status: 500 }
//     );
//   }
// }

// ... (EmailComponentData, EmailMetaData, SendEmailPayload interfaces)
// ... (renderReactEmailComponent function)
// ... (NewsletterEmail function)

export async function sendNewsletter(payload: SendEmailPayload) {
  try {
    const { meta, blocks } = payload;

    if (!meta.subject || !meta.to || !meta.from) {
      return {
        success: false,
        message: "Missing required email metadata (subject, to, or from).",
      };
    }
    if (!blocks || blocks.length === 0) {
      return { success: false, message: "No content blocks provided." };
    }

    const emailHtml = await render(
      <NewsletterEmail meta={meta} blocks={blocks} />,
      {
        pretty: true,
      }
    );

    const { data, error } = await resend.emails.send({
      from: "WesendAll <noreply@wesendall.com>",
      to: meta.to.split(",").map((email) => email.trim()),
      subject: meta.subject,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, message: error.message };
    }

    console.log("Email sent successfully:", data);
    return { success: true, data };
  } catch (err: any) {
    console.error("Server action error:", err);
    return {
      success: false,
      message: err.message || "An unexpected error occurred.",
    };
  }
}
