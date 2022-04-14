---
title: 'Install the CLI'
---

Install the Nhost CLI using the following command:

```bash
sudo curl -L https://raw.githubusercontent.com/nhost/cli/main/get.sh | bash
```

Initialize a new Nhost App locally:

```bash
nhost init -n "nhost-example-app" && cd nhost-example-app
```

And initialize the GitHub repository in the same folder:

```bash
echo "# nhost-example-app" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/[github-username]/nhost-example-app.git
git push -u origin main
```

Now go back to the **Nhost Console** and click **Deployments**. You just made a new deployment to your Nhost app!

![Deployments tab](/img/cli-workflow/deployments-tab.png)

If you click on the deployment you can see that nothing was really deployed. That’s because we just made a change to the README file.

![Deployments details](/img/cli-workflow/deployments-details.png)

Let's do some local backend changes!