"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
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
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="font-medium text-primary">Message envoyé</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Merci {name.trim()}. Nous revenons vers{" "}
          {email.trim().length > 0 ? email.trim() : "vous"} à propos de :{" "}
          {message.trim()}.
        </p>
        <Button
          type="button"
          variant="ghost"
          className="mt-4"
          onClick={() => {
            setSent(false);
            setName("");
            setEmail("");
            setMessage("");
          }}
        >
          Nouveau message
        </Button>
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
          required
          rows={4}
        />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit">Envoyer</Button>
        <p className="text-xs text-muted-foreground">Nom et message requis.</p>
      </div>
    </form>
  );
}
