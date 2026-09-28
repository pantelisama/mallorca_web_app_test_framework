# Contributing

`main` is always stable and deployable. Nobody commits to it directly.

1. `git checkout main && git pull`
2. `git checkout -b feature/<short-name>` (or `fix/…`)
3. Commit on the branch. The pre-commit hook runs typecheck + unit tests
   (enable once with `npm run setup-hooks`).
4. `git push -u origin feature/<short-name>` and open a PR into `main`.
5. The **PR gate** must be green. Merge.
6. The **main pipeline** runs the full gate and deploys `app/` to GitHub Pages.

Recommended GitHub setting: *Settings → Branches → protect `main`*: require a PR and the
`PR gate` check before merging.
