import React from "react";
import {Input as UIInput} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import {EmailInput as UIEmailInput} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/email-input";
import {
    PasswordInput as UIPasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/password-input";

// Извлечение необходимых полей для каждого типа input
export type TTextInput = Pick<
  React.ComponentProps<typeof UIInput>,
  "value" | "onChange" | "placeholder" | "name" | "icon" | "extraClass" | "autoComplete"
> & { type?: "text" };

export type TEmailInput = Pick<
  React.ComponentProps<typeof UIEmailInput>,
  "value" | "onChange" | "placeholder" | "name" | "isIcon" | "autoComplete"
> & { type: "email" };

export type TPasswordInput = Pick<
  React.ComponentProps<typeof UIPasswordInput>,
  "value" | "onChange" | "placeholder" | "name" | "icon" | "extraClass" | "autoComplete"
> & { type: "password" };