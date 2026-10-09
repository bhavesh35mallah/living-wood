import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import {
  XIcon,
  SendIcon,
  SparklesIcon,
  ShoppingBagIcon,
  EyeIcon,
  CheckIcon,
  RefreshCwIcon,
} from "./icons";
import { useShopStore } from "@/lib/store";
import {
  type ChatMessage,
  initialGreetingMessage,
  processConciergeQuery,
} from "@/lib/chatbot-engine";
import type { Product } from "@/data/catalog";

export function ChatbotWidget() {
  const {
    isChatbotOpen,
    openChatbot,
    closeChatbot,
    toggleChatbot,
    chatbotInitialPrompt,
    setChatbotInitialPrompt,
    addItem,
    openQuickView,
    inventoryProducts,
    currency,
  } = useShopStore();

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreetingMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasAddedId, setHasAddedId] = useState<string | null>(null);
  const [showCalloutBadge, setShowCalloutBadge] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currencySymbol = currency === "EUR" ? "€" : currency === "GBP" ? "£" : "$";

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isChatbotOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isChatbotOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isChatbotOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isChatbotOpen]);

  // Handle external trigger with initial prompt (e.g. from PDP or footer)
  useEffect(() => {
    if (isChatbotOpen && chatbotInitialPrompt) {
      handleUserSubmit(chatbotInitialPrompt);
      setChatbotInitialPrompt(null);
    }
  }, [isChatbotOpen, chatbotInitialPrompt]);

  const handleUserSubmit = (userText: string) => {
    if (!userText.trim()) return;

    const newMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: userText.trim(),
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    setIsTyping(true);

    // Realistic typing delay for thoughtful atelier response
    setTimeout(() => {
      const response = processConciergeQuery(userText, inventoryProducts);
      const assistantMsg: ChatMessage = {
        id: "concierge-" + Date.now(),
        ...response,
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleQuickAdd = (product: Product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      src: product.src,
      swatchName: product.swatches[0]?.name || "Default",
      swatchColor: product.swatches[0]?.hex || "#DBD3C2",
      detail: product.detail,
    });
    setHasAddedId(product.id);
    setTimeout(() => setHasAddedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        ...initialGreetingMessage,
        id: "msg-" + Date.now(),
        timestamp: "Just now",
      },
    ]);
  };

  // Helper to render basic markdown formatting cleanly
  const renderFormattedText = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      if (!line) return <div key={idx} className="h-2" />;

      // Bullet points
      const isBullet = line.startsWith("• ") || line.startsWith("- ");
      const rawText = isBullet ? line.slice(2) : line;

      // Parse bold **text** and `code`
      const parts = rawText.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);

      const parsedElements = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={pIdx}
              className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-primary font-medium"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        // Basic Markdown Links [label](href)
        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          return (
            <Link
              key={pIdx}
              to={linkMatch[2]}
              className="underline text-primary hover:opacity-80 transition-opacity"
            >
              {linkMatch[1]}
            </Link>
          );
        }
        return part;
      });

      return isBullet ? (
        <div key={idx} className="flex items-start gap-2 my-1 text-sm text-foreground/90">
          <span className="text-primary mt-1 text-xs select-none">•</span>
          <div className="flex-1 leading-relaxed">{parsedElements}</div>
        </div>
      ) : (
        <p key={idx} className="my-1 text-sm leading-relaxed text-foreground/90">
          {parsedElements}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating launcher trigger at bottom right */}
      {!isChatbotOpen && (
        <aside
          aria-label="Atelier concierge widget"
          className="fixed bottom-6 right-6 z-40 flex items-end gap-3"
        >
          {/* Subtle greeting bubble for first-time visitors */}
          {showCalloutBadge && (
            <div className="hidden sm:flex items-center gap-2 bg-card border border-border px-3.5 py-2 rounded-sm shadow-md text-xs text-foreground/80 max-w-xs animate-in fade-in slide-in-from-right-3 duration-300">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
              <span>Need styling advice or looking for a piece? Ask concierge.</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCalloutBadge(false);
                }}
                className="text-muted-foreground hover:text-foreground ml-1 p-0.5"
                title="Dismiss"
              >
                <XIcon size={12} />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              openChatbot();
              setShowCalloutBadge(false);
            }}
            className="flex items-center gap-2.5 bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-lg hover:opacity-95 transition-all hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Open Atelier Concierge Chat"
          >
            <SparklesIcon size={18} className="text-primary-foreground/90 transition-transform group-hover:rotate-12" />
            <span className="font-sans text-xs tracking-wider uppercase font-medium">
              Atelier Concierge
            </span>
          </button>
        </aside>
      )}

      {/* Concierge Chatbot Dialog Window */}
      {isChatbotOpen && (
        <section
          role="dialog"
          aria-modal="true"
          aria-label="Living Wood Atelier Concierge Chat"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[640px] h-[85vh] sm:h-[620px] flex flex-col bg-card border border-border shadow-2xl rounded-sm overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-muted/30 border-b border-border select-none">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-serif italic">
                LW
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-card" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-base tracking-tight text-foreground font-normal">
                    Living Wood Concierge
                  </h2>
                </div>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                  Styling & Product Advisor · Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                className="text-muted-foreground hover:text-foreground p-1.5 rounded transition-colors"
                title="Reset conversation"
              >
                <RefreshCwIcon size={14} />
              </button>
              <button
                type="button"
                onClick={closeChatbot}
                className="text-muted-foreground hover:text-foreground p-1.5 rounded transition-colors"
                title="Close chat"
              >
                <XIcon size={16} />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
            {messages.map((message) => {
              const isUser = message.sender === "user";

              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  {/* Badge & Timestamp */}
                  <div className="flex items-center gap-2 mb-1 px-1">
                    {!isUser && (
                      <span className="text-[10px] uppercase tracking-wider text-primary font-medium">
                        {message.badge || "Atelier Concierge"}
                      </span>
                    )}
                    <span className="text-[10px] text-muted-foreground">
                      {message.timestamp}
                    </span>
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[88%] rounded-sm p-3.5 ${
                      isUser
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-card border border-border shadow-xs text-foreground"
                    }`}
                  >
                    {isUser ? (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                    ) : (
                      renderFormattedText(message.text)
                    )}

                    {/* Interactive Embedded Product Recommendation Cards */}
                    {message.products && message.products.length > 0 && (
                      <div className="mt-3.5 space-y-2.5 pt-2 border-t border-border/60">
                        {message.products.map((product) => {
                          const isJustAdded = hasAddedId === product.id;

                          return (
                            <div
                              key={product.id}
                              className="group flex gap-3 p-2 bg-background border border-border/80 rounded-sm hover:border-primary/50 transition-all text-left"
                            >
                              <Link
                                to={`/products/${product.id}`}
                                onClick={closeChatbot}
                                className="relative shrink-0 w-16 h-16 bg-muted rounded-xs overflow-hidden"
                              >
                                <img
                                  src={product.src}
                                  alt={product.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </Link>

                              <div className="flex-1 min-w-0 flex flex-col justify-between">
                                <div>
                                  <div className="flex items-start justify-between gap-1">
                                    <Link
                                      to={`/products/${product.id}`}
                                      onClick={closeChatbot}
                                      className="font-serif text-sm text-foreground hover:underline truncate block"
                                    >
                                      {product.title}
                                    </Link>
                                    <span className="font-serif text-xs font-medium text-foreground shrink-0">
                                      {currencySymbol}
                                      {product.price}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-muted-foreground truncate">
                                    {product.materials.split(",")[0]}
                                  </p>
                                </div>

                                <div className="flex items-center gap-1.5 mt-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleQuickAdd(product)}
                                    className={`flex items-center gap-1 px-2 py-1 text-[11px] uppercase tracking-wider font-medium rounded-xs transition-colors ${
                                      isJustAdded
                                        ? "bg-emerald-700 text-white"
                                        : "bg-primary text-primary-foreground hover:opacity-90"
                                    }`}
                                  >
                                    {isJustAdded ? (
                                      <>
                                        <CheckIcon size={12} />
                                        <span>Added</span>
                                      </>
                                    ) : (
                                      <>
                                        <ShoppingBagIcon size={12} />
                                        <span>Add to Bag</span>
                                      </>
                                    )}
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      openQuickView(product);
                                    }}
                                    className="flex items-center gap-1 px-2 py-1 text-[11px] border border-border text-foreground hover:bg-muted rounded-xs transition-colors"
                                  >
                                    <EyeIcon size={12} />
                                    <span>Details</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Suggestion Chips */}
                  {message.actionChips && message.actionChips.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                      {message.actionChips.map((chip, cIdx) => (
                        <button
                          key={cIdx}
                          type="button"
                          onClick={() => handleUserSubmit(chip)}
                          className="text-[11px] bg-card border border-border/80 hover:border-primary text-foreground/80 hover:text-foreground px-2.5 py-1 rounded-full transition-all text-left shadow-2xs hover:bg-muted/40"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Pulsing Concierge Typing Indicator */}
            {isTyping && (
              <div className="flex flex-col items-start animate-in fade-in duration-200">
                <span className="text-[10px] uppercase tracking-wider text-primary font-medium mb-1 px-1">
                  Atelier Concierge is typing...
                </span>
                <div className="bg-card border border-border rounded-sm px-4 py-2.5 shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" />
                  <span
                    className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Bar if conversation is empty or user scrolled down */}
          <div className="p-2.5 bg-muted/20 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUserSubmit(inputValue);
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about pieces, materials, shipping..."
                className="flex-1 bg-background border border-border px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/70 rounded-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-primary text-primary-foreground p-2.5 rounded-sm hover:opacity-90 disabled:opacity-40 transition-opacity shrink-0"
                title="Send message"
              >
                <SendIcon size={16} />
              </button>
            </form>
            <p className="text-[10px] text-muted-foreground text-center mt-1.5 tracking-tight">
              Instant product recommendations & store guidance · 24/7
            </p>
          </div>
        </section>
      )}
    </>
  );
}
