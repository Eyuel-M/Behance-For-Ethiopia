const FROM = process.env.EMAIL_FROM ?? "Hire Ethiopia's Best <noreply@hireethiopiasbest.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hireethiopiasbest.com";

async function send(to: string, subject: string, html: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[EMAIL - no RESEND_API_KEY] To: ${to} | Subject: ${subject}`);
    return false;
  }
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({ from: FROM, to, subject, html });
    if (error) { console.error("[EMAIL error]", error); return false; }
    return true;
  } catch (e) {
    console.error("[EMAIL exception]", e);
    return false;
  }
}

function base(body: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px">
<table width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e4e7">
<tr><td style="background:#0d2318;padding:28px 32px">
  <span style="font-size:15px;font-weight:800;color:#ffffff;letter-spacing:-0.01em">Hire Ethiopia's Best</span>
</td></tr>
<tr><td style="padding:32px">${body}</td></tr>
<tr><td style="padding:20px 32px;border-top:1px solid #f4f4f5;background:#fafafa">
  <p style="margin:0;font-size:12px;color:#a1a1aa">© ${new Date().getFullYear()} Hire Ethiopia's Best. <a href="${SITE_URL}" style="color:#6dcc46;text-decoration:none">hireethiopiasbest.com</a></p>
</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function btn(label: string, href: string) {
  return `<a href="${href}" style="display:inline-block;margin-top:20px;padding:12px 24px;background:#6dcc46;color:#0d2318;font-size:14px;font-weight:800;text-decoration:none;border-radius:100px">${label} →</a>`;
}

// ── Transactional emails ──────────────────────────────────────────────────────

export async function sendBriefConfirmation(to: string, businessName: string) {
  return send(to, "We received your brief — Hire Ethiopia's Best", base(`
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:900;color:#111827">Brief received, ${businessName}.</h1>
    <p style="margin:0 0 16px;font-size:15px;color:#6b7280;line-height:1.6">
      Your brief is now being reviewed by our team. We'll match you with the right designer and be in touch within <strong style="color:#111827">48 hours</strong>.
    </p>
    <p style="margin:0 0 8px;font-size:14px;color:#6b7280;line-height:1.6">
      In the meantime, you can track your brief status at any time:
    </p>
    ${btn("Track your brief", `${SITE_URL}/track`)}
    <p style="margin:24px 0 0;font-size:13px;color:#a1a1aa">Questions? Reply to this email or write to <a href="mailto:info@hireethiopiasbest.com" style="color:#6dcc46;text-decoration:none">info@hireethiopiasbest.com</a>.</p>
  `));
}

export async function sendProposalReady(to: string, businessName: string, proposalUrl: string) {
  return send(to, "Your designer proposal is ready — Hire Ethiopia's Best", base(`
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:900;color:#111827">Your proposal is ready, ${businessName}.</h1>
    <p style="margin:0 0 16px;font-size:15px;color:#6b7280;line-height:1.6">
      We've shortlisted designers for your brief. Review their profiles, portfolios, and our recommendation, then select the one you'd like to work with.
    </p>
    <p style="margin:0;font-size:14px;color:#6b7280">No commitment required until you've approved — ETB 0 upfront.</p>
    ${btn("Review your proposal", proposalUrl)}
    <p style="margin:24px 0 0;font-size:13px;color:#a1a1aa">This link is private to you. Do not share it.</p>
  `));
}

export async function sendFeedbackRequest(to: string, designerName: string, feedbackUrl: string) {
  return send(to, `How was working with ${designerName}? — Hire Ethiopia's Best`, base(`
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:900;color:#111827">How did it go?</h1>
    <p style="margin:0 0 16px;font-size:15px;color:#6b7280;line-height:1.6">
      Your project with <strong style="color:#111827">${designerName}</strong> has been marked complete. We'd love to hear your honest feedback — it takes less than a minute and helps us maintain the quality of our network.
    </p>
    ${btn("Leave feedback", feedbackUrl)}
    <p style="margin:24px 0 0;font-size:13px;color:#a1a1aa">Your review will be shared with the designer and shown (anonymously if you prefer) on our platform.</p>
  `));
}

export async function sendDesignerApplicationReceived(to: string, name: string) {
  return send(to, "Application received — Hire Ethiopia's Best", base(`
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:900;color:#111827">Application received, ${name}.</h1>
    <p style="margin:0 0 16px;font-size:15px;color:#6b7280;line-height:1.6">
      Thank you for applying to the network. Our team reviews each application carefully — we'll be in touch within <strong style="color:#111827">5–7 business days</strong>.
    </p>
    <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6">
      We review in batches, so even if you don't hear back immediately your application is in the queue. The best thing you can do in the meantime is add recent projects to your portfolio.
    </p>
    <p style="margin:24px 0 0;font-size:13px;color:#a1a1aa">Questions? Write to <a href="mailto:info@hireethiopiasbest.com" style="color:#6dcc46;text-decoration:none">info@hireethiopiasbest.com</a>.</p>
  `));
}

export async function sendMilestoneUpdate(to: string, clientName: string, projectTitle: string, milestoneName: string, projectUrl: string) {
  return send(to, `Milestone update: ${milestoneName} — Hire Ethiopia's Best`, base(`
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:900;color:#111827">Milestone update</h1>
    <p style="margin:0 0 16px;font-size:15px;color:#6b7280;line-height:1.6">
      Hi ${clientName}, your designer has submitted work for the milestone <strong style="color:#111827">${milestoneName}</strong> on <strong style="color:#111827">${projectTitle}</strong>.
    </p>
    <p style="margin:0;font-size:14px;color:#6b7280">Review the submission and provide feedback from your project dashboard.</p>
    ${btn("View project", projectUrl)}
  `));
}
