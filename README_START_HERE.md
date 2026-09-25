# Yuvraj Singh — Space Edition

A self-contained GitHub Pages portfolio. No ChatGPT hosting, framework installation, paid service signup, or build step is needed to publish the supplied page.

## Publish this update

1. Extract the ZIP on your computer.
2. Open `publish/index.html` in your browser to preview the design. Local preview intentionally disables live counter writes and message submission.
3. Open your repository: [yuvrajsinghdrmlau/yuvrajprofile.github.io](https://github.com/yuvrajsinghdrmlau/yuvrajprofile.github.io).
4. Back up the existing `index.html` before replacing it.
5. Choose **Add file → Upload files**. Upload the **contents of `publish`**, not the folder and not the ZIP. Replace `index.html`; keep `resume.pdf` alongside it at the repository root. `.nojekyll` can remain from your current repository.
6. Commit the update. In **Settings → Pages**, keep **Deploy from a branch → main → /(root)**. Wait for the Pages deployment in **Actions** to finish.
7. Open [your portfolio](https://yuvrajsinghdrmlau.github.io/yuvrajprofile.github.io/). Hard refresh if needed: Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac.

The new `index.html` contains its styles, JavaScript, and compressed artwork. Old `styles.css` and `script.js` are no longer used; they can remain in the repository without affecting this version. This avoids mismatched CSS/JS uploads.

Do not upload the owner editor or source folders just to run the website. GitHub Pages is public; never put private visitor messages, passwords, API secrets, or confidential notes in this repository.

GitHub's authoritative publishing instructions: [Configure a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Add your own journal material

1. Keep `journal-editor.html` on your computer and open it in a browser.
2. Choose your **latest** Space Edition `index.html`. If you have made later updates online, download that current version first.
3. Select an entry to edit, or choose **New entry**.
4. Pick Thought, Progress, Article / report, or Vlog. Enter only your real content; dates are optional.
5. For a vlog or an externally published article, paste its full HTTPS link. Links open externally—there are no third-party video embeds.
6. Use **Preview text**, then **Save entry locally**.
7. Choose **Download updated index.html** and upload that file to your GitHub repository root. Commit to publish.

The editor sends nothing to a server. It is **not** an online admin login. Someone can edit their own downloaded copy, but changing your live site requires permission to your GitHub repository. Keep a backup; closing the editor before downloading loses the session's changes.

Only your actual Virtual Environment Simulator concept is included initially. Its status is **Concept / next scope**, not a finished implementation. Vlogs, articles, and progress filters show an honest empty state until you add something.

The concept has been sharpened with a physics-first milestone, versioned rules, deterministic replay, unit validation, cross-domain contracts, sandbox limits, and explicit uncertainty. It does not claim that an AI can enforce every unknown law or calculate drag with missing inputs.

## Interactive features

- Project category filters, keyboard-accessible constellation nodes, search, category filters, related-node buttons, zoom, and desktop drag-to-pan.
- On a phone, tap nodes or use the node dropdown and zoom buttons. Vertical touch scrolling is preserved; touch dragging does not pan the graph.
- Ctrl+K / Cmd+K opens quick navigation on a desktop. Escape closes it. Mobile has a compact menu.
- Subtle star motion, a pause control, reduced-motion support, and animations that stop while the hero is offscreen or the tab is hidden.
- The constellation counts its real contents: 6 projects, 4 skills, 8 tools, 3 roles, and 1 core profile (22 nodes).

## Visits, kudos, and reactions

This retains **counterapi.com** and the existing `yuvrajprofile.github.io` namespace. That namespace is an identifier, not the hosting address. Keeping it preserves continuity; do not rename it just to match the GitHub host.

- Page visits: `view/portfolio`. Each published page load attempts one increment. This is **not a unique-person count**.
- Kudos: `kudos/total`.
- Reactions: `reaction/applause`, `reaction/useful`, `reaction/inspired`.
- A kudos and each reaction have their own totals. The kudos figure is not their sum.
- The existing browser-local sent markers are retained. This is a convenience against accidental repeats, **not a secure anti-abuse system**.
- Reads use `readOnly=true`; writes happen once per visit attempt or button press. HTTP errors, invalid responses, and timeouts do not become fake zeros or confirmed success messages.
- Counter writes are never automatically retried. On a timeout, the service might have received the request even if the response was lost.
- A dash means no verified total is available. Use **Reconnect counters** to retry reads only.
- The provider may cache, deduplicate, or filter requests, so multiple refreshes need not equal exact increments.

The service is public and keyless. It is not audited analytics and does not verify individual people. Availability, cross-browser persistence, live increments, and backend delivery were **not** verified during this redesign. Test on the published site. Never embed a private API token in the static page.

This is not the separate `counterapi.dev` service. Do not mix their endpoints. [CounterAPI.com documentation](https://counterapi.com/).

## Private visitor messages

The form still posts to FormSubmit for `yuvrajdrmlau@gmail.com`. Submissions are not displayed on the portfolio. FormSubmit processes them and forwards them to your mailbox, so “private” means not publicly posted—not end-to-end secrecy from the service.

1. Once published, submit your own test message.
2. If FormSubmit sends an activation email, confirm it from your mailbox.
3. Check inbox and spam. Only then consider delivery verified.

The form keeps spam checks enabled. No test messages were sent on your behalf. If the service is unavailable, visitors can use the visible email link. The successful-return fragment indicates return from the form flow, not proof of email delivery.

Official setup and activation: [FormSubmit](https://formsubmit.co/).

## Use another GitHub account

For a personal root address, use a repository named exactly `NEW_USERNAME.github.io` under that username. Upload the files inside `publish` and enable Pages from `main`, root.

For any other repository name, the URL is `https://NEW_USERNAME.github.io/REPOSITORY_NAME/`. Assets and résumé links are relative, so both layouts work. The form's return URL adapts to the live page automatically. Keep the existing project links pointing to `yuvrajsinghdrmlau` if that is where the work lives. Keep the counter namespace if you want shared totals to continue across addresses.

## What was preserved / changed

Preserved: six project repository destinations, email, LinkedIn, résumé bytes, three experience entries, the user's simulator idea, CounterAPI identifiers, and FormSubmit destination.

Changed: all visual design; an original generated planet backdrop; accessible interactive constellation; an honest journal without invented placeholder stories; a local content editor; clear counter error states; privacy wording; and a single-file website build.

Résumé-derived employment and metric claims were retained from your previous package, not independently verified or updated. Recheck them before publishing. The résumé PDF itself is unchanged.

## Checks and limitations

See `qa/VALIDATION.md` for completed checks. Automated code checks are not a visual browser review. The browser environment refused local-file navigation during this run, so desktop/mobile screenshots and real browser interactions could not be verified here. Preview locally and check the live result at desktop and phone widths before sharing it with recruiters.

## Optional developer workflow

Editable source is in `source/`. `node source/build.mjs` regenerates `publish/index.html` from the template, stylesheet, script, and embedded artwork. Node is optional unless you want to change the source files.

**Important:** the local journal editor updates the downloaded page, not `source/index.template.html`. Before rebuilding from source, copy the latest `journal-data` block from your updated `index.html` back into the template or the rebuild will restore older journal content. Keep a backup first.

The original image-generation prompt and provenance are in `DESIGN_NOTES.md`.
