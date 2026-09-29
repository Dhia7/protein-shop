"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length === 0 || message.trim().length === 0) {
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-line bg-zinc-50 p-6">
        <p className="font-black tracking-wide uppercase">Message envoyé</p>
        <p className="mt-2 text-sm text-zinc-500">
          Merci {name.trim()}. Nous revenons vers{" "}
          {email.trim().length > 0 ? email.trim() : "vous"} à propos de :{" "}
          {message.trim()}.
        </p>
        <button
          type="button"
          className="btn-ghost mt-6"
          onClick={() => {
            setSent(false);
            setName("");
            setEmail("");
            setMessage("");
          }}
        >
          Nouveau message
        </button>
      </div>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contact-name">Nom</Label>
          <Input
            id="contact-name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Votre nom"
            className="h-11 rounded-none"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-email">E-mail</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="vous@email.com"
            className="h-11 rounded-none"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Produit, quantité, ville de livraison…"
          className="rounded-none"
          required
          rows={4}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary">
          Envoyer
        </button>
        <p className="text-xs text-zinc-500">Nom et message requis.</p>
      </div>
    </form>
  );
}
