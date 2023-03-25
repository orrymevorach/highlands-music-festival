<h1 align="center">
 Highlands Music Festival
</h1>

This site was built using Next.JS

1.  **Start dev server**

    Navigate into your new site’s directory and start it up.

    ```
    npm run dev
    ```

2.  **Open the code and start customizing!**

    Your site is now running at http://localhost:3000!

3.  **Deployments**

To deploy code to production, create a PR and merge it into master

To deploy code to staging environments run, merge code into any of the follow branches:
`preview-environment`
`preview-environment-v2`
`preview-environment-v3`

As a shortcut, you can run:

```
npm run deployPreview
```

- Before you run this command, make sure you are on the current branch you wish wish to deploy, and make sure all your changes are committed to the branch
- This command will delete the current preview-environment branch locally and upstream, create a new branch off of your current branch and push it to a new preview-environment branch
