# The Sphinx Processing Folder

Welcome! If you're looking to customize or adjust our processing of Sphinx-exported files, you're in the right place.

In this folder you'll find our custom processing tools to transform **Sphinx-exported files** into their corresponding **Fumadocs-expected formats**.

This takes some work, as Fumadocs is only designed to process Markdown files out of the box.

A good **starting place** is `content-collections.ts`, which is the first point where Sphinx data is ingested and processed. There you'll also find an explanation of how data flows from it's location on the disk to display by Fumadocs (which may eventually be formatted and moved here).

**Good luck!**

---

### Here's why we need this:

When you instruct Sphinx to export your documentation project as json like this:

```
sphinx-build -M json [Project Source] [Target Export Directory]
```

It exports `*.fjson` files in the target export directory. These are really files in the `JSON` format containing the html body and associated metadata about each file in your project.

In order to get Fumadocs to display these files, we need to process them into Fumadoc's expected formats. This is done here, in a separate `sphinx` folder to make it easier for future editors to locate and tinker with.

In the end, what actually happens is that the processing utilities defined in this folder are exported and re-imported in the appropriate places within the Fumadocs/Next.js app. If you want to find these places, you can:

1. Locate code in the `sphinx` folder marked with `export`
2. Do a global search to see where these names are imported in other files.