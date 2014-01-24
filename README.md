# Grid Layout

This is an experiment into organising webpages with a 2d grid format (or 2-dimentional array).

In theory the grid would end up looking something link this

    var H = "header",
      C = "content",
      S = "sidebar",
      F = "footer";

    var grid = [
      [ "H", _, _ ]
      [ "C", _, S ]
      [ "F", _, _ ]
    ];

    render(grid);
