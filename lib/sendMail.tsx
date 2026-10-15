"use server";
// utils/emailTemplateMapper.ts
import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Img,
  Link,
  Hr,
  Preview,
} from "@react-email/components";
import { Resend } from "resend";

export interface EmailComponent {
  id: string;
  type: string;
  content: any;
  props?: any;
}

export interface EmailData {
  meta: {
    from: string;
    replyTo: string;
    to: string;
    subject: string;
    previewText: string;
  };
  components: EmailComponent[];
  audience: string;
}

// Custom React Email Components
const NewsletterTemplate = ({ emailData }: { emailData: EmailData }) => {
  const { meta, components } = emailData;

  // Helper function to extract YouTube video ID from URL
  const extractYouTubeId = (url: string): string => {
    if (!url) return "";

    const regexPatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of regexPatterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return url; // Return as-is if no pattern matches (assuming it's already an ID)
  };

  // Helper function to get social media brand colors
  const getSocialColor = (platform: string): string => {
    const colors: { [key: string]: string } = {
      twitter: "#1da1f2",
      facebook: "#4267b2",
      instagram: "#e4405f",
      linkedin: "#0077b5",
      youtube: "#ff0000",
      tiktok: "#000000",
    };
    return colors[platform.toLowerCase()] || "#374151";
  };

  // Helper function to get social media icons (text-based for email compatibility)
  const getSocialIcon = (platform: string): string => {
    const icons: { [key: string]: string } = {
      twitter:
        "https://files.edgestore.dev/3v8x7mlqi33ugzw4/publicImages/_public/d228f0d5-5d3a-47ba-a05d-5a5e38b2d4b9.png",
      facebook:
        "https://files.edgestore.dev/3v8x7mlqi33ugzw4/publicImages/_public/93ed240a-3eb3-4685-a87e-9dc1bc4fdeb4.png",
      instagram:
        "https://files.edgestore.dev/3v8x7mlqi33ugzw4/publicImages/_public/698cc70f-7ed4-4e83-88b3-f6d83cbbe37d.png",
      linkedin:
        "https://files.edgestore.dev/3v8x7mlqi33ugzw4/publicImages/_public/75f2fef8-429e-4213-b197-229fdbb42cc9.png",
      youtube:
        "https://files.edgestore.dev/3v8x7mlqi33ugzw4/publicImages/_public/780526b9-07e0-46a0-b859-b4e05ae84834.png",
      tiktok:
        "https://files.edgestore.dev/3v8x7mlqi33ugzw4/publicImages/_public/fb040856-f5e3-4465-9d8d-78542f459e2f.png",
    };
    return icons[platform.toLowerCase()] || platform.charAt(0).toUpperCase();
  };

  const renderEmailComponent = (component: EmailComponent, index: number) => {
    switch (component.type) {
      case "text":
        return (
          <Text
            key={component.id}
            style={{
              fontSize: "16px",
              lineHeight: "24px",
              color: "#374151",
              margin: "16px 0",
            }}
          >
            {component.content}
          </Text>
        );

      case "heading1":
        return (
          <Heading
            key={component.id}
            as="h1"
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#111827",
              margin: "24px 0 16px 0",
              lineHeight: "1.2",
            }}
          >
            {component.content}
          </Heading>
        );

      case "heading2":
        return (
          <Heading
            key={component.id}
            as="h2"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#111827",
              margin: "20px 0 12px 0",
              lineHeight: "1.3",
            }}
          >
            {component.content}
          </Heading>
        );

      case "heading3":
        return (
          <Heading
            key={component.id}
            as="h3"
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#111827",
              margin: "16px 0 8px 0",
              lineHeight: "1.4",
            }}
          >
            {component.content}
          </Heading>
        );

      case "image":
        return (
          <Section key={component.id} style={{ margin: "24px 0" }}>
            <Img
              src={component.content.src}
              alt={component.content.alt}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                maxWidth: "600px",
              }}
            />
          </Section>
        );

      case "button":
        return (
          <Section
            key={component.id}
            style={{ margin: "24px 0", textAlign: "center" }}
          >
            <Button
              href={component.content.url}
              style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "600",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              {component.content.text}
            </Button>
          </Section>
        );

      case "bulletList":
        return (
          <Section key={component.id} style={{ margin: "16px 0" }}>
            {component.content.map((item: string, idx: number) => (
              <Text
                key={idx}
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#374151",
                  margin: "4px 0",
                  paddingLeft: "20px",
                  position: "relative",
                }}
              >
                <span style={{ position: "absolute", left: "0" }}>•</span>
                {item}
              </Text>
            ))}
          </Section>
        );

      case "numberedList":
        return (
          <Section key={component.id} style={{ margin: "16px 0" }}>
            {component.content.map((item: string, idx: number) => (
              <Text
                key={idx}
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#374151",
                  margin: "4px 0",
                  paddingLeft: "24px",
                  position: "relative",
                }}
              >
                <span
                  style={{ position: "absolute", left: "0", fontWeight: "600" }}
                >
                  {idx + 1}.
                </span>
                {item}
              </Text>
            ))}
          </Section>
        );

      case "youtube":
        const videoId = extractYouTubeId(component.content.videoUrl);
        return (
          <Section
            key={component.id}
            style={{
              margin: "24px 0",
              padding: "16px",
              textAlign: "center",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
            }}
          >
            <Link
              href={
                component.content.videoUrl ||
                `https://youtube.com/watch?v=${videoId}`
              }
            >
              <Img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt={component.content.title}
                style={{
                  width: "100%",
                  maxWidth: "560px",
                  height: "auto",
                  borderRadius: "8px",
                  border: "2px solid #e5e7eb",
                }}
              />
            </Link>
            <Text
              style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: "8px 0 0 0",
                textAlign: "center",
              }}
            >
              {component.content.title}
            </Text>
            <Link
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                color: "#ef4444",
                margin: "4px 0",
                display: "flex",
              }}
              href={
                component.content.videoUrl ||
                `https://youtube.com/watch?v=${videoId}`
              }
            >
              <Img
                src="https://files.edgestore.dev/3v8x7mlqi33ugzw4/publicImages/_public/780526b9-07e0-46a0-b859-b4e05ae84834.png"
                alt={"Youtube Logo"}
                style={{
                  width: "34.5px",
                  height: "24px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: "10px",
                }}
              />
              Watch the Video
            </Link>
          </Section>
        );

      case "pricingCard":
        return (
          <Section
            key={component.id}
            style={{
              margin: "24px auto",
              maxWidth: "420px",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "32px",
              backgroundColor: "#ffffff",
              textAlign: "center",
            }}
          >
            <Heading
              as="h3"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#111827",
                margin: "0 0 16px 0",
              }}
            >
              {component.content.title}
            </Heading>
            <Text
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#2563eb",
                margin: "0 0 24px 0",
              }}
            >
              {component.content.price}
              <span style={{ fontSize: "16px", color: "#6b7280" }}>
                {component.content.period}
              </span>
            </Text>
            {component.content.features.map((feature: string, idx: number) => (
              <Text
                key={idx}
                style={{
                  fontSize: "16px",
                  color: "#374151",
                  margin: "8px 0",
                  textAlign: "left",
                  paddingLeft: "20px",
                  position: "relative",
                }}
              >
                <span
                  style={{ position: "absolute", left: "0", color: "#10b981" }}
                >
                  ✓
                </span>
                {feature}
              </Text>
            ))}
            <Button
              href={component.content.buttonUrl}
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "12px 32px",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "600",
                textDecoration: "none",
                display: "inline-block",
                marginTop: "24px",
                width: "80%",
              }}
            >
              {component.content.buttonText}
            </Button>
          </Section>
        );

      case "productCard":
        return (
          <Section
            key={component.id}
            style={{
              margin: "24px auto",
              maxWidth: "400px",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "24px",
              backgroundColor: "#ffffff",
              textAlign: "center",
            }}
          >
            <Img
              src={component.content.image}
              alt={component.content.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            />
            <Heading
              as="h3"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#111827",
                margin: "0 0 8px 0",
              }}
            >
              {component.content.name}
            </Heading>
            <Text
              style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: "0 0 12px 0",
                lineHeight: "20px",
              }}
            >
              {component.content.description}
            </Text>
            <Text
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#059669",
                margin: "0 0 16px 0",
              }}
            >
              {component.content.price}
            </Text>
            <Button
              href={component.content.buttonUrl}
              style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "600",
                textDecoration: "none",
                display: "inline-block",
                width: "80%",
              }}
            >
              {component.content.buttonText}
            </Button>
          </Section>
        );

      case "twoColumnProducts":
        return (
          <Section key={component.id} style={{ margin: "24px 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tr>
                {component.content.products.map((product: any, idx: number) => (
                  <td
                    key={idx}
                    style={{
                      width: "50%",
                      padding: "0 12px",
                      verticalAlign: "top",
                    }}
                  >
                    <Section
                      style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        padding: "20px",
                        backgroundColor: "#ffffff",
                        textAlign: "center",
                      }}
                    >
                      <Img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginBottom: "12px",
                        }}
                      />
                      <Heading
                        as="h4"
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#111827",
                          margin: "0 0 8px 0",
                        }}
                      >
                        {product.name}
                      </Heading>
                      <Text
                        style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          margin: "0 0 8px 0",
                          lineHeight: "16px",
                        }}
                      >
                        {product.description}
                      </Text>
                      <Text
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#059669",
                          margin: "0 0 12px 0",
                        }}
                      >
                        {product.price}
                      </Text>
                      <Button
                        href={product.buttonUrl}
                        style={{
                          backgroundColor: "#000000",
                          color: "#ffffff",
                          padding: "8px 16px",
                          borderRadius: "4px",
                          fontSize: "14px",
                          fontWeight: "600",
                          textDecoration: "none",
                          display: "inline-block",
                          width: "80%",
                        }}
                      >
                        {product.buttonText}
                      </Button>
                    </Section>
                  </td>
                ))}
              </tr>
            </table>
          </Section>
        );

      case "socialLinks":
        return (
          <Section
            key={component.id}
            style={{ margin: "24px 0", textAlign: "center" }}
          >
            <table style={{ margin: "0 auto" }}>
              <tr>
                {component.content.map((social: any, idx: number) => (
                  <td key={idx} style={{ padding: "0 8px" }}>
                    <Link
                      href={social.url}
                      style={{
                        display: "inline-block",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#ffffff",
                        textAlign: "center",
                        lineHeight: "40px",
                        color: "#ffffff",
                        textDecoration: "none",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {social.platform === "youtube" ? (
                        <Img
                          src={getSocialIcon(social.platform)}
                          alt={"Youtube Logo"}
                          style={{
                            width: "34.5px",
                            height: "24px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginRight: "10px",
                          }}
                        />
                      ) : (
                        <Img
                          src={getSocialIcon(social.platform)}
                          alt={social.platform}
                          style={{
                            width: "30px",
                            height: "30px",
                            objectFit: "cover",
                            // borderRadius: "8px",
                            marginRight: "10px",
                          }}
                        />
                      )}
                    </Link>
                  </td>
                ))}
              </tr>
            </table>
          </Section>
        );

      case "codeBlock":
        return (
          <Section key={component.id} style={{ margin: "24px 0" }}>
            {component.content.title && (
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                  margin: "0 0 8px 0",
                }}
              >
                {component.content.title}
              </Text>
            )}
            <div
              style={{
                backgroundColor: "#1f2937",
                color: "#10b981",
                padding: "16px",
                borderRadius: "8px",
                fontFamily: "monospace",
                fontSize: "14px",
                lineHeight: "20px",
                border: "1px solid #374151",
                whiteSpace: "pre-wrap",
                overflow: "auto",
              }}
            >
              {component.content.code}
            </div>
          </Section>
        );

      case "section":
        return (
          <Section
            key={component.id}
            style={{
              margin: "32px 0",
              padding: "24px",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              borderLeft: "4px solid #3b82f6",
            }}
          >
            <Heading
              as="h3"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#111827",
                margin: "0 0 16px 0",
              }}
            >
              {component.content.title}
            </Heading>
            <Text
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                color: "#374151",
                margin: "0",
              }}
            >
              {component.content.content}
            </Text>
          </Section>
        );

      case "divider":
        return (
          <Hr
            key={component.id}
            style={{
              border: "none",
              borderTop: "1px solid #e5e7eb",
              margin: "32px 0",
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Html lang="en">
      <Head />
      {meta.previewText && <Preview>{meta.previewText}</Preview>}
      <Body
        style={{
          backgroundColor: "#f3f4f6",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            padding: "40px 32px",
          }}
        >
          {/* Email Content */}
          {components.map((component, index) =>
            renderEmailComponent(component, index)
          )}

          {/* Footer */}
          <Section
            style={{
              marginTop: "48px",
              paddingTop: "24px",
              borderTop: "1px solid #e5e7eb",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                fontSize: "12px",
                color: "#6b7280",
                margin: "0 0 8px 0",
              }}
            >
              You received this email because you subscribed to our newsletter.
            </Text>
            <Text style={{ fontSize: "12px", color: "#6b7280", margin: "0" }}>
              <Link
                href="#"
                style={{ color: "#2563eb", textDecoration: "underline" }}
              >
                Unsubscribe
              </Link>{" "}
              |{" "}
              <Link
                href="#"
                style={{ color: "#2563eb", textDecoration: "underline" }}
              >
                Update preferences
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const resend = new Resend(process.env.RESEND_API_KEY);
// Server action example for sending emails
export async function sendEmailToAudience(emailData: EmailData) {
  try {
    // Get audience emails (you'll need to implement this based on your database)
    const audienceEmails = await getAudienceEmails(emailData.audience);

    // Send email to each subscriber
    const results = await Promise.allSettled(
      audienceEmails.map(
        async (subscriber: { email: string; name: string }) => {
          return await resend.emails.send({
            from: "WesendAll <noreply@wesendall.com>",
            to: subscriber.email,
            replyTo: emailData.meta.replyTo,
            subject: emailData.meta.subject,
            react: React.createElement(NewsletterTemplate, { emailData }),
          });
        }
      )
    );

    const successful = results.filter(
      (result) => result.status === "fulfilled"
    ).length;
    const failed = results.filter(
      (result) => result.status === "rejected"
    ).length;

    return {
      success: true,
      sent: successful,
      failed: failed,
      total: audienceEmails.length,
    };
  } catch (error) {
    console.error("Failed to send emails:", error);
    return {
      success: false,
      error: "Failed to send",
    };
  }
}

// Helper function to get audience emails (implement based on your database)
async function getAudienceEmails(
  audienceId: string
): Promise<{ email: string; name: string }[]> {
  // This is a placeholder - implement based on your database structure
  // Example:
  // const audience = await prisma.audience.findUnique({
  //   where: { id: audienceId },
  //   include: { subscribers: true }
  // });
  // return audience.subscribers;

  return [{ email: "gmukejohnbaptist@gmail.com", name: "JB" }];
}
