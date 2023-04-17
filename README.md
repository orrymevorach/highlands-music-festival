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

To run a Contentful deployment:

1. Create a new environment off of master in Contentful
2. Use the "Merge" extension to merge in any content model changes from a different branch
3. Test the new branch in your local environment by changing the environment variable in your .local.env file
4. If you need to build any content before you switch the environment, do it now
5. When you are ready to deploy, change the `master` alias to the new environment you created
6. Changing the alias does not deploy any new content, so if you need to run a deployment, do so manually in Netlify.

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
