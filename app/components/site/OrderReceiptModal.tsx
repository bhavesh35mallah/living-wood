import { useState } from "react";
import { useShopStore, type UserOrder } from "@/lib/store";
import {
  XIcon,
  PrinterIcon,
  DownloadIcon,
  CopyIcon,
  CheckIcon,
  PackageCheckIcon,
} from "./icons";

export function OrderReceiptModal() {
  const { viewingReceiptOrder, closeReceipt, currency, addToast } = useShopStore();
  const [copied, setCopied] = useState(false);

  if (!viewingReceiptOrder) return null;

  const order = viewingReceiptOrder;
  const currencySymbol = currency === "EUR" ? "€" : currency === "GBP" ? "£" : "$";

  const customerName = order.customerName || "Eleanor Vance";
  const customerEmail = order.customerEmail || "eleanor.vance@example.com";
  const shippingAddress =
    order.shippingAddress || "742 Evergreen Terrace, Apt 4B, Portland, OR 97201";
  const paymentMethod = order.paymentMethod || "Visa ending in •••• 4242";

  // Calculations
  const calculatedSubtotal =
    order.subtotal ||
    order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const calculatedDiscount = order.discount || 0;
  const calculatedShipping =
    order.shippingFee !== undefined
      ? order.shippingFee
      : calculatedSubtotal >= 100
      ? 0
      : 10;
  const grandTotal = order.total;

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Generate and download offline styled HTML receipt
  const handleDownloadHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Receipt #${order.id} · Living Wood Atelier</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background: #FAF8F4;
      color: #2D2F28;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
    }
    .receipt {
      background: #FFFFFF;
      max-width: 720px;
      width: 100%;
      border: 1px solid #E5E0D8;
      padding: 48px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid #E5E0D8;
      padding-bottom: 24px;
      margin-bottom: 32px;
    }
    .brand-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 32px;
      letter-spacing: -0.02em;
      color: #454E3C;
      font-weight: 500;
    }
    .brand-sub {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #7A7870;
      margin-top: 4px;
    }
    .meta-box {
      text-align: right;
    }
    .receipt-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 20px;
      font-weight: 500;
    }
    .meta-line {
      font-size: 12px;
      color: #7A7870;
      margin-top: 3px;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 1px solid #E5E0D8;
    }
    .section-title {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #454E3C;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .info-p {
      font-size: 13px;
      line-height: 1.6;
      color: #3C3B37;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    th {
      text-align: left;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #7A7870;
      border-bottom: 1px solid #E5E0D8;
      padding: 10px 0;
    }
    td {
      padding: 14px 0;
      border-bottom: 1px solid #F0ECE4;
      font-size: 13px;
    }
    .item-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 16px;
      font-weight: 500;
    }
    .item-variant {
      font-size: 11px;
      color: #7A7870;
      margin-top: 2px;
    }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .totals {
      margin-left: auto;
      max-width: 280px;
      margin-bottom: 32px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      padding: 6px 0;
      color: #55534E;
    }
    .grand-total {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #E5E0D8;
      padding-top: 10px;
      margin-top: 6px;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 24px;
      font-weight: 600;
      color: #2D2F28;
    }
    .footer-note {
      background: #FAF8F4;
      padding: 18px 24px;
      border-radius: 2px;
      border: 1px solid #EAE5DC;
      font-size: 11px;
      line-height: 1.6;
      color: #7A7870;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <div>
        <div class="brand-title">LIVING WOOD</div>
        <div class="brand-sub">Atelier & Home Goods · Portland, OR</div>
      </div>
      <div class="meta-box">
        <div class="receipt-title">Order Receipt #${order.id}</div>
        <div class="meta-line">Date: ${order.date}</div>
        <div class="meta-line">Status: ${order.status}</div>
        <div class="meta-line">Tracking: ${order.trackingNumber}</div>
      </div>
    </div>

    <div class="grid">
      <div>
        <div class="section-title">Billed & Shipped To</div>
        <div class="info-p"><strong>${customerName}</strong></div>
        <div class="info-p">${shippingAddress}</div>
        <div class="info-p">${customerEmail}</div>
      </div>
      <div>
        <div class="section-title">Payment & Dispatch</div>
        <div class="info-p">Payment: ${paymentMethod}</div>
        <div class="info-p">Carrier: Carbon-Neutral Tracked Ground</div>
        <div class="info-p">Packaging: 100% Recyclable Paper Mailer</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Piece</th>
          <th class="text-center">Qty</th>
          <th class="text-right">Price</th>
          <th class="text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        ${order.items
          .map(
            (item) => `<tr>
              <td>
                <div class="item-title">${item.title}</div>
                <div class="item-variant">Colorway: ${item.swatchName}</div>
              </td>
              <td class="text-center">${item.quantity}</td>
              <td class="text-right">${currencySymbol}${item.price}.00</td>
              <td class="text-right">${currencySymbol}${item.price * item.quantity}.00</td>
            </tr>`
          )
          .join("")}
      </tbody>
    </table>

    <div class="totals">
      <div class="total-row">
        <span>Subtotal</span>
        <span>${currencySymbol}${calculatedSubtotal}.00</span>
      </div>
      ${
        calculatedDiscount > 0
          ? `<div class="total-row" style="color: #454E3C;">
              <span>Promotion</span>
              <span>-${currencySymbol}${calculatedDiscount}.00</span>
            </div>`
          : ""
      }
      <div class="total-row">
        <span>Shipping</span>
        <span>${calculatedShipping === 0 ? "Complimentary ($0.00)" : `${currencySymbol}${calculatedShipping}.00`}</span>
      </div>
      <div class="total-row">
        <span>Estimated Tax</span>
        <span>$0.00</span>
      </div>
      <div class="grand-total">
        <span>Total Paid</span>
        <span>${currencySymbol}${grandTotal}.00</span>
      </div>
    </div>

    <div class="footer-note">
      Thank you for welcoming these handmade objects into your home. Each piece is crafted in small batches by European heritage makers. Should you have any questions or wish to arrange an effortless return within 30 days, contact concierge@livingwood.com.
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt-${order.id}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast(`Downloaded official receipt #${order.id}`, "success");
  };

  const handleCopyDetails = () => {
    const summary = `LIVING WOOD ATELIER — ORDER RECEIPT #${order.id}
Date: ${order.date}
Status: ${order.status}
Tracking: ${order.trackingNumber}
Customer: ${customerName} (${customerEmail})
Shipping To: ${shippingAddress}
Total Paid: ${currencySymbol}${grandTotal}.00
Items:
${order.items.map((i) => `• ${i.title} (${i.swatchName}) x${i.quantity} — ${currencySymbol}${i.price * i.quantity}.00`).join("\n")}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    addToast("Order receipt copied to clipboard", "info");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static"
      role="dialog"
      aria-modal="true"
      aria-label={`Order Receipt #${order.id}`}
      onClick={closeReceipt}
    >
      <div
        className="relative my-6 flex w-full max-w-2xl flex-col bg-background shadow-2xl border border-border rounded-xs overflow-hidden print:border-none print:shadow-none print:m-0 print:max-w-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-6 py-3.5 print:hidden">
          <div className="flex items-center gap-2">
            <PackageCheckIcon size={18} className="text-primary" />
            <span className="text-xs font-medium uppercase tracking-wider text-foreground">
              Official Order Receipt · #{order.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadHtml}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 rounded-xs transition-opacity"
              title="Download HTML Receipt"
            >
              <DownloadIcon size={14} />
              <span>Download Receipt</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border text-foreground hover:bg-muted/80 rounded-xs transition-colors"
              title="Print or Save as PDF"
            >
              <PrinterIcon size={14} />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={handleCopyDetails}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              title="Copy Receipt text"
            >
              {copied ? <CheckIcon size={16} className="text-emerald-600" /> : <CopyIcon size={16} />}
            </button>

            <button
              type="button"
              onClick={closeReceipt}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors ml-1"
              title="Close"
            >
              <XIcon size={18} />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper */}
        <div className="p-8 sm:p-10 bg-card text-foreground print:p-0">
          {/* Receipt Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-border pb-6 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">
                ATELIER &amp; HOME OBJECTS
              </span>
              <h1 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl mt-0.5">
                LIVING WOOD
              </h1>
              <p className="text-xs text-muted-foreground mt-1">
                742 Evergreen Terrace · Portland, OR 97201
              </p>
              <p className="text-xs text-muted-foreground">
                concierge@livingwood.com · +1 (503) 892-4102
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block rounded-xs bg-primary/10 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-primary uppercase">
                {order.status}
              </span>
              <h2 className="font-display text-xl text-foreground font-medium mt-2">
                Invoice #{order.id}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Date: {order.date}
              </p>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                Tracking: {order.trackingNumber}
              </p>
            </div>
          </div>

          {/* Client & Dispatch Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-border py-6 text-xs">
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-primary font-medium mb-2">
                Billed &amp; Shipped To
              </h3>
              <p className="font-medium text-foreground text-sm">{customerName}</p>
              <p className="text-muted-foreground mt-0.5 leading-relaxed">
                {shippingAddress}
              </p>
              <p className="text-muted-foreground mt-0.5">{customerEmail}</p>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-primary font-medium mb-2">
                Payment &amp; Fulfillment
              </h3>
              <p className="text-foreground">
                <span className="text-muted-foreground">Payment Method: </span>
                {paymentMethod}
              </p>
              <p className="text-foreground mt-0.5">
                <span className="text-muted-foreground">Carrier: </span>
                Carbon-Neutral Express (3–5 days)
              </p>
              <p className="text-foreground mt-0.5">
                <span className="text-muted-foreground">Packaging: </span>
                Plastic-free, 100% recyclable paper
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="py-6 border-b border-border">
            <h3 className="text-[10px] uppercase tracking-widest text-primary font-medium mb-4">
              Purchased Objects
            </h3>

            <div className="divide-y divide-border/60">
              <div className="grid grid-cols-12 pb-2 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                <span className="col-span-7">Piece</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-3 text-right">Amount</span>
              </div>

              {order.items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 py-3.5 items-center text-xs">
                  <div className="col-span-7 flex items-center gap-3">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="size-11 shrink-0 rounded-xs bg-muted object-cover print:border print:border-border"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-medium text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        Colorway: {item.swatchName}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-2 text-center text-muted-foreground font-medium">
                    {item.quantity}
                  </div>

                  <div className="col-span-3 text-right font-medium text-foreground">
                    {currencySymbol}
                    {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 py-6 border-b border-border text-xs">
            <div className="max-w-xs text-muted-foreground text-[11px] leading-relaxed">
              <p className="font-medium text-foreground mb-1">
                30-Day Effortless Guarantee
              </p>
              <p>
                Each piece has been inspected by hand before dispatch. Unwashed,
                unused items in original packaging can be returned within 30 days
                using our pre-paid return label.
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>
                  {currencySymbol}
                  {calculatedSubtotal.toFixed(2)}
                </span>
              </div>

              {calculatedDiscount > 0 && (
                <div className="flex justify-between text-primary font-medium">
                  <span>Atelier Discount</span>
                  <span>
                    -{currencySymbol}
                    {calculatedDiscount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-muted-foreground">
                <span>Carbon-Neutral Shipping</span>
                <span>
                  {calculatedShipping === 0
                    ? "Complimentary ($0.00)"
                    : `${currencySymbol}${calculatedShipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Sales Tax</span>
                <span>$0.00</span>
              </div>

              <div className="flex justify-between border-t border-border pt-2 text-base font-serif font-semibold text-foreground">
                <span>Total Paid</span>
                <span>
                  {currencySymbol}
                  {grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Receipt Footer Notice */}
          <div className="pt-6 text-center text-[10px] text-muted-foreground leading-relaxed">
            <p className="font-serif italic text-xs text-foreground/80 mb-1">
              “Crafted with patience. Packaged with care. Made for living.”
            </p>
            <p>
              Form &amp; Field / Living Wood Atelier · Registered in Oregon · All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
