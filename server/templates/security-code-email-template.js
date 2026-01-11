export const securityCodeEmailTemplate = (securityCode, link) => {
    return `
    <div style="
      font-family: Arial, Helvetica, sans-serif;
      background-color:#0b1220;
      padding:40px;
      color:#d1d5db;
    ">

      <div style="
        max-width:520px;
        margin:auto;
        background:#0f1b2d;
        border-radius:14px;
        padding:32px;
        box-shadow:0 0 25px rgba(0,0,0,0.4);
      ">

        <h2 style="
          margin-top:0;
          color:#4cc9f0;
          font-size:22px;
        ">
          Admin Access Request
        </h2>

        <p style="font-size:15px; line-height:1.6;">
          Use the following access code to enter your dashboard:
        </p>

        <!-- Security Code -->
        <div style="
          margin:24px 0;
          background:#111827;
          border:1px solid #1f2937;
          padding:14px 22px;
          border-radius:10px;
          display:inline-block;
          font-size:21px;
          font-weight:bold;
          color:#4cc9f0;
        ">
          ${securityCode}
        </div>

        <!-- CTA Button -->
        <div style="margin-top:30px;">
          <a href="${link}"
             target="_blank"
             style="
               display:inline-block;
               background:#38bdf8;
               color:#0b1220;
               text-decoration:none;
               padding:12px 22px;
               border-radius:999px;
               font-size:14px;
               font-weight:bold;
             ">
            Go to My Portfolio →
          </a>
        </div>

        <p style="
          margin-top:30px;
          font-size:12px;
          color:#9ca3af;
        ">
          If you did not request this access, you can safely ignore this email.
        </p>

      </div>
    </div>
  `
}
