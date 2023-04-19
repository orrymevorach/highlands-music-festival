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

Contentful workflow:

1. Do all development work in the `staging` branch
2. Add/edit content models
3. When you are finished making change, create a new environment called `master-<todays data>` off of master. For example: `master-2023-04-20`
4. Use the "Merge" extension to merge in any content model changes. Set the target branch to `staging` and the source branch to the new one you just created
5. Add/edit any content entries that you would like to test
6. Go to API keys and give your new environment access to the production API key
7. Change the NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT variable to the name of your new environment
8. Test your changes
9. IMPORTANT: Before you deploy, make sure to change all the content entries to the state you want them in when you deploy.
10. When you are ready to deploy, change the `master` alias to the new environment you created. (This will not trigger a deployment)
11. Merge your PR into master. This will trigger a netlify deployment with the latest code and latest content entries

Staging Branch:

- The staging branch is called "staging"
- This branch is pointing at the "staging" environment in Contentful
- To easily create a replica of master in Contentful called staging, run:

```
npm run createContentfulEnvironment
```

- This will delete the existing `staging` environment, and create a new one off of master
- To deply the `staging` git branch:

1. Make sure you are on the current branch you wish wish to deploy,
2. make sure all your changes are committed to the branch
3. Run:

```
npm run deployStaging
```

- This command will delete the current preview-environment branch locally and upstream, create a new branch off of your current branch and push it to a new preview-environment branch

Another staging environment you can use is called `preview-environment`
To deploy code to this environment, either push code to it, or run:

```
npm run deployPreview
```
