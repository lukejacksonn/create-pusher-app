import { h, app } from 'hyperapp'
import './index.css'

const Main = (p, c) => h("main", p, c)
const Title = (c) => h("h1", null, c)
const Subtitle = (c) => h("h3", null, c)
const List = (c) => h("ul", null, c)
const Item = item => h("li", {}, item.data.message)
const Line = _ => h("hr")

app({
  state: {
    feed: "<%= feed %>",
    instance: "<%= instance %>",
    items: [],
  },
  actions: {
    addItem: (s, a, item) => ({ items: s.items.concat(item) })
  },
  events: {
    load: (s, a) => {
      const feeds = new Feeds({ instanceId: s.instance })
      const playground = feeds.feed(s.feed)
      playground.subscribe({
        previousItems: 5,
        onOpen: _ => console.log("Feeds: Connection established"),
        onError: error => console.error("Feeds error:", error),
        onItem: a.addItem,
      })
    }
  },
  view: (s, a) =>
    Main({}, [
      Title(`${s.feed} feed`),
      Subtitle(s.instance),
      Line(),
      List(s.items.map(Item))
    ])
})
