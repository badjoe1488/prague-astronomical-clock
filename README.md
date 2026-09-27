# Prague Astronomical Clock

Prazsky orloj. The medieval machine that has been lying to tourists, telling the truth to the sky, and ringing Death's bell over Old Town Square since **1410**.

This repo hosts an interactive web replica of the clock on the south wall of Prague's Old Town Hall. Open `index.html` in a browser. No build step, no framework tantrum, no npm black hole.

The published canvas app from [Orlog](https://github.com/badjoe1488/Orlog) is preserved as `orlog.html` (Gleason / Orloj-style azimuthal disc with a clock ring). The main page is the full astronomical face: dial, calendar, zodiac, and the apostle walk.

## Run

```bash
# just open it
open index.html
```

Or dump the folder onto GitHub Pages (`main` / root).

---

## History

The oldest working astronomical clock still doing its job.

Clockmaker **Mikulas of Kadan** and Charles University astronomer **Jan Sindel** finished the mechanical clock and the astronomical dial in **1410**. First written mention: 9 October 1410. The calendar disc came later in the century. The walking apostles are later still. The folklore version — master Hanus blinded so he could never build another — is a 19th-century ghost story. Cute. False.

The tower itself is older: a 14th-century sentinel stuck onto the town hall, originally there to scream fire and invasion, not to pose for group photos.

The thing has been wrecked, patched, burned, and politically cosplayed for six hundred years:

- **1490s** — calendar dial added; the face starts looking like the monument people recognize.
- **1865-66** — Josef Manes paints the calendar medallions still sold on every postcard.
- **May 1945** — the Prague uprising. Fire guts the town hall. Wooden apostles charcoal. The clock stops.
- **1948** — machinery repaired, apostles recarved by Vojtech Sucharda, the orloj runs again.
- **2005** — statues and the lower ring restored; pigeons get a net instead of a feast.
- **2018** — a "restoration" of the calendar that quietly swapped medieval peasants for the artist's pals. Heritage people lost their minds. Fair.

What remains is not a museum prop. Roughly three quarters of the moving iron is still 15th-century. It is the third-oldest astronomical clock on Earth and the oldest that still ticks on its original work.

---

## The astronomical dial

The upper face is not a clock in the kitchen-wall sense. It is a **stereographic astrolabe**: the sky smashed flat from the north celestial pole onto the plane of the equator, cut for Prague's latitude (~50N).

Read it like this:

| Layer | What it is doing |
| --- | --- |
| Blue hemisphere | Day sky. The Sun lives here when it is above the horizon. |
| Brown / black hemisphere | Night. |
| Gold tropic rings | Tropic of Cancer (inner), celestial equator, Tropic of Capricorn (outer). |
| Zodiac / ecliptic ring | The Sun's yearly path. It is offset and it rotates. |
| Sun hand | True solar position on the ecliptic, plus a little gilt sun that rides the day/night divide. |
| Moon hand | Lunar position and phase. The ball is dark on one side for a reason. |
| Golden star / offset hand | Sidereal time — the stars' clock, not yours. |
| Outer 24-hour ring (schwabacher numerals) | Old Czech / Italian hours, counted from sunset. |
| Curved temporal hour lines | Babylonian hours: daylight chopped into 12 unequal pieces that stretch in June and shrink in December. |

Modern Central European Time is the boring circle most visitors actually look at. The rest of the dial is a planetarium that happens to have hands.

The Sun's pointer does two jobs at once: it tells ordinary time *and* it marks the current zodiac sign as it crawls the ecliptic. No app. No ephemeris printout. Just bronze and geometry from before Copernicus was a rumor.

This replica computes positions from the system clock. It is not a digital twin of the 1410 gear train. The iron original is a mean-time machine with medieval approximations; this page is the same picture drawn with modern solar longitude.

---

## Calendar and zodiac rings

Under the astrolabe sits the **calendar dial** — the part Josef Manes turned into a year you can point at.

- **Outer ring** — the months. Twelve rural labors: sowing, harvest, slaughter, the whole pre-industrial to-do list.
- **Zodiac ring** — Aries through Pisces, locked to the tropical year. On the real clock this ring belongs to the *lower* face; on the upper face a separate ecliptic ring carries the same twelve beasts around the Sun.
- **Name-day / saint ring** — 365 medallions (leap day gets stuffed in). Medieval Prague told the date by whose feast it was, not by an Arabic numeral in the corner of a phone.
- **Pointer** — a fixed marker. The whole disc crawls one notch a day.

The 2018 recut of Manes's months is the scandal mentioned above: faces, ages, clothes, even genders drifted off the 1860s cartoons and onto people the restorer knew. The Club for Old Prague noticed. The culture ministry got letters. The clock, as usual, kept turning.

In this app the lower disc is a working calendar: current civil date, zodiac name, and a month medallion. Click **+1 day** to watch the year walk.

---

## The apostle procession

Every hour, on the hour, from **9:00 to 21:00**, two windows above the dial slam open and the **Walk of the Apostles** begins.

Twelve wooden saints trundle past on a hidden carousel:

1. Peter (keys)
2. Matthew
3. John
4. Andrew
5. Philip
6. James the Greater
7. James the Lesser
8. Thomas
9. Simon
10. Thaddeus (Jude)
11. Bartholomew
12. Paul (sword)

The crowd in the square is not watching the astronomy. They are watching the puppet show.

Flanking statues grind into motion at the same time:

- **Death** — a skeleton. Turns an hourglass, tugs a bell-rope. The only figure that is honest about the arrangement.
- **Vanity** — mirror. Will not look at you.
- **Greed** — moneybag. The older carving was a vicious antisemitic caricature; later replacements dropped the slander and kept the vice.
- **The Turk / Pleasure** — lute or scarf, depending which century's wood you are looking at.

When the last apostle clears the window, a **rooster** flaps and crows above the mask of an angel. Then the windows shut and the square goes back to selling ham.

This page plays the procession automatically at the top of the hour, or whenever you hit **Walk**. Death still rings. The rooster still has opinions.

---

## Files

| File | What |
| --- | --- |
| `index.html` | Page shell for the full orloj |
| `clock.js` | Astronomical dial, calendar / zodiac, apostle walk |
| `orlog.html` | The published Orlog standard-map app (azimuthal equidistant disc + hour ring) |
| `LICENSE` | MIT |

## License

MIT. History belongs to Prague. This code does not.
