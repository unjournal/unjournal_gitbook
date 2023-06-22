# This Gitbook; editing it, etc

## What is Gitbook? How to edit it?

{% hint style="info" %}
See my notes on [another gitbook here](https://effective-giving-marketing.gitbook.io/untitled/appendix/how-this-gitbook-works), on how to edit it etc
{% endhint %}

_Some quick points:_

* Gitbook is mainly used for tech documentation; but it has some important strengths and it's pretty good for general use
* It is based in markdown and other simple flat text files
* It synchronizes through Git/Github, and you can push and pull ... but you can also select 'edit' and 'merge' and use it fairly WYSIWYG
* They have a good support team (try their chat/help button)

## Shortcut for switching between public/private versions of the same page

{% hint style="info" %}
18 Jun 2023 -- needs moving after moving Gitbook location
{% endhint %}

Switching between the public and private version sof Gitbook (while maintaining the same relative page) is a pain.

**Semi-automate: going from the editable to the public version with a 'bookmarklet'**

Setting the following as a ‘bookmark’ seems to help (Chrome: bookmarks manager, edit any existing bookmark by right click --> edit)

![](<../.gitbook/assets/image (4).png>)



Name: “Switch to Public Gitbook page” (or whatever)

URL: set to:

{% code overflow="wrap" %}
```
javascript:(function() { var publicUrl = document.location.href.replace('app.gitbook.com/o/-MfFk4CTSGwVOPkwnRgx/s/b1RpEkRWWqZAV4SlrFCt', 'effective-giving-marketing.gitbook.io/the-unjournal-project-and-communication-space/'); window.open(publicUrl, '_blank'); })()
```
{% endcode %}



**To go in the other direction (public to editable version of a page)**

Setting the following as a ‘bookmark’ seems to help (chrome: bookmarks manager, edit any existing bookmark by right click --> edit)

Name: “Switch to Editable Gitbook page” (or whatever)

URL: set to:

{% code overflow="wrap" %}
```
javascript:(function() { var editableUrl = document.location.href.replace('effective-giving-marketing.gitbook.io/the-unjournal-project-and-communication-space/', 'app.gitbook.com/o/-MfFk4CTSGwVOPkwnRgx/s/b1RpEkRWWqZAV4SlrFCt/'); window.open(editableUrl, '_blank'); })()
```
{% endcode %}
