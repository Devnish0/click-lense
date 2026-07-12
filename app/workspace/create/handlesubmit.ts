import { z } from "zod";
import { Message } from "./types";
import axios from "axios";
import {
  createUrlSchemaClient,
  validPassword,
  validSlug,
} from "@/app/lib/validators/clientValidators.ts/url";
import { normalizeUrl } from "@/components/search";

interface HandleSlugArgs {
  setSlugSuccess: (message: Message | null) => void;
  slug: string;
}

interface handlePassword {
  password: string;
  setPasswordSuccess: (message: Message | null) => void;
}

interface handleUrl {
  inUrl: string;
  setUrlSuccess: (message: Message | null) => void;
}

export const handleSlug = async ({ setSlugSuccess, slug }: HandleSlugArgs) => {
  if (!slug) {
    setSlugSuccess(null);
    return;
  }
  try {
    const validatedSlug = validSlug.safeParse(slug);
    if (validatedSlug.success) {
      console.log("slug first check is passed");
      try {
        const response = await axios.get(`/api/url/slugcheck?slug=${slug}`);
        console.log(response);
        if (response.data && response.data.data) {
          if (response.data.data.exists) {
            setSlugSuccess({
              type: "error",
              message: "Slug already exists. Please choose another one.",
            });
          } else {
            setSlugSuccess({ type: "success", message: "Slug is valid!" });
          }
        }
      } catch (error) {
        console.error("Error checking slug:", error);
        setSlugSuccess({
          type: "error",
          message: "Error checking slug. Please try again later.",
        });
      }
    } else if (validatedSlug.error) {
      const message =
        validatedSlug.error.issues[0]?.message || "Invalid slug format";
      setSlugSuccess({ type: "error", message: message });
    }
  } catch (error) {
    console.error("error:", error);
  }
};

export const handlePassword = ({
  setPasswordSuccess,
  password,
}: handlePassword) => {
  try {
    const result = validPassword.safeParse(password);
    if (result.success) {
      setPasswordSuccess({
        type: "success",
        message: "Password created successfully!",
      });
      console.log("Valid Password:", result.data);
    } else {
      const message =
        result.error.flatten().fieldErrors?.[0] ??
        result.error.issues[0]?.message;

      setPasswordSuccess({
        type: "error",
        message: message,
      });
      console.log("Invalid Password:", result.error);
    }
  } catch (error) {
    console.error("error:", error);
  }
};

export const handleUrl = ({ inUrl, setUrlSuccess }: handleUrl) => {
  try {
    const result = createUrlSchemaClient.safeParse({
      originalUrl: normalizeUrl(inUrl),
    });
    if (result.success) {
      setUrlSuccess({
        type: "success",
        message: "URL created successfully!",
      });
      console.log("Valid URL:", result.data.originalUrl);
    } else {
      const message =
        result.error.flatten().fieldErrors.originalUrl?.[0] ??
        result.error.issues[0]?.message;

      setUrlSuccess({
        type: "error",
        message: message,
      });
      console.log("Invalid URL:", result.error);
    }
  } catch (error) {
    console.error("error:", error);
  }
};
