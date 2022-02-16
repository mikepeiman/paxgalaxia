# TODO

- generate a hex-grid coordinate system
- assign stars to one of the coordinates; remove that coordinate from the "emptyCoords" array and add to "occupiedCoords" array
- create a tick-based turn system
- generate ships movement on tick
- generate new ships on tick
- implement star types with different ship generation rates
- create a tick-rate adjustment option
- create a save/load game function (at least for map to begin with)
- implement drag-and-drop star placement for map creation
- allow to save permanent maps
- implement drag-vector ship movement between stars
- implement multiple player identities and zone-of-control background colors
- implement attack dynamics between stars of opposing players
- button to reset all destination star IDs for vector arrows
- option for player to save multiple tactical maps (set of vector assignments for a given map), name them, and switch between them at a click
- when two stars are attacking each other, draw arrows to meet in middle
- when two stars are attacking each other, draw arrows at a distance in proportion to star power (num ships)