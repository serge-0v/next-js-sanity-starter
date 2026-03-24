"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import SectionContainer from "@/components/ui/section-container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useCallback } from "react";
import { Loader2 } from "lucide-react";
import { stegaClean } from "next-sanity";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type FormNewsletterProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "form-newsletter" }
>;

export default function FormNewsletter({
  padding,
  colorVariant,
  consentText,
  buttonText,
  successMessage,
}: FormNewsletterProps) {
  // form validation schema
  const formSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: "Please enter your email",
      })
      .email({
        message: "Please enter a valid email",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSend = useCallback(
    async ({ email }: { email: string }) => {
      try {
        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          toast(successMessage);
          form.reset();
        } else {
          toast.error(result.error);
        }
      } catch (error: any) {
        toast.error(error.message);
        throw new Error(error.message);
      }
    },
    [form],
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await handleSend(values);
  }

  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <Form {...form}>
        <form className="pt-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="off"
                      // ignore 1 Password autofill
                      data-1p-ignore
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="h-9"
              size="sm"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
              )}
              {buttonText}
            </Button>
          </div>
          {consentText && <p className="mt-4 text-xs">{consentText}</p>}
        </form>
      </Form>
    </SectionContainer>
  );
}
