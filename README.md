# RoS Farming Guide

This is the repo of https://exeay.github.io/swgoh-sas-farm-guide/ . Essentially this is guide for relatively new players in the mobile game Star Wars Galaxy of Heroes. The guide says what teams to farm and in what order.

The page is built with [astro](https://astro.build/) and [react](https://react.dev/).

Feel free to use the code as you wish.

## Hot to run

This project uses pnpm as package manager.

#### Build

`pnpm build`

#### Run locally

`pnpm dev`

#### Format code

`pnpm pretty`

## How it works

Under the src/asset/data folder there are three json-files. The ones under the swgoh folder are data directly fetched form [the swgoh.gg api](http://api.swgoh.gg/). Specifically two calls are used to update the data, `/abilities` and `/characters`. The [farm-guide-data.json](./src/assets/data/ros/farm-guide-data.json) file contains all the data required to render the guide.

Essentially the json file is an array of blocks or parts of the guide. The data structure looks like [FarmGuideDataPart i the model file](./src/model/farm-guide.ts). The character id and abilities ids (zetas and omicrons) must match the id:s from swgoh.gg.

Each part consists of several teams and some meta data. Each team consists of members (typically 5 members). But instead of members a team can have sub-teams. This will in turn generate a sub block of teams. If a team members id is `OPTIONAL` instead of an id from swgoh.gg then an anonymous icon will be generated and you can add some notes in the name section. E.g. "Free to choose empire character".
