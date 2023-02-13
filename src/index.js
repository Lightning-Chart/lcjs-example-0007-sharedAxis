/*
 * LightningChartJS example that showcases sharing an Axis between two series.
 *  Also, styling of chart zooming rectangle & axes.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    ColorPalettes,
    ColorRGBA,
    SolidFill,
    SolidLine,
    emptyLine,
    AxisTickStrategies,
    LegendBoxBuilders,
    UIOrigins,
    Themes,
} = lcjs

// ----- Cache used styles -----
const palette = ColorPalettes.arction(10)
const colors = [6, 9, 0].map(palette)
const axisYColors = [colors[0], colors[1]]
const axisYStyles = axisYColors.map((color) => new SolidFill({ color }))
const axisYStrokeStyles = axisYStyles.map((fillStyle) => new SolidLine({ fillStyle, thickness: 2 }))
const axisYStylesHighlight = axisYStyles.map((fillStyle) => fillStyle.setA(100))
const axisXStyleHighlight = new SolidFill({ color: colors[2].setA(100) })
const seriesStrokeStyles = axisYStrokeStyles
const fittingRectangleStrokeStyle = new SolidLine({ fillStyle: new SolidFill({ color: ColorRGBA(255, 255, 255, 100) }), thickness: 2 })
const zoomingRectangleFillStyle = new SolidFill({ color: colors[2].setA(100) })

// Decide on an origin for DateTime axis.
const dateOrigin = new Date(2018, 1, 5)
// Create a XY Chart.
const chart = lightningChart()
    .ChartXY({
        // theme: Themes.darkGold
    })
    .setPadding({
        right: 50,
    })
    .setTitle('Unit production comparison')
    // Style chart zooming rectangle.
    .setFittingRectangleStrokeStyle(fittingRectangleStrokeStyle)
    .setZoomingRectangleFillStyle(zoomingRectangleFillStyle)

// Cache reference to default axes and style them.
const axisX = chart
    .getDefaultAxisX()
    .setOverlayStyle(axisXStyleHighlight)
    .setNibOverlayStyle(axisXStyleHighlight)
    // Set the X Axis to use DateTime TickStrategy
    .setTickStrategy(AxisTickStrategies.DateTime, (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin))

// Style the default Y Axis.
const axisY1 = chart
    .getDefaultAxisY()
    .setStrokeStyle(axisYStrokeStyles[0])
    .setOverlayStyle(axisYStylesHighlight[0])
    .setNibOverlayStyle(axisYStylesHighlight[0])
    // Modify the TickStrategy to remove gridLines from this Y Axis.
    .setTickStrategy(
        // Use Numeric TickStrategy as base.
        AxisTickStrategies.Numeric,
        // Use mutator to modify the TickStrategy.
        (tickStrategy) =>
            tickStrategy
                // Modify Major Tick Style by using a mutator.
                .setMajorTickStyle((tickStyle) => tickStyle.setGridStrokeStyle(emptyLine))
                // Modify Minor Tick Style by using a mutator.
                .setMinorTickStyle((tickStyle) => tickStyle.setGridStrokeStyle(emptyLine)),
    )

// Create additional styled Y axis on left side.
const axisY2 = chart
    .addAxisY(false)
    .setTitle('No of units produced')
    .setStrokeStyle(axisYStrokeStyles[1])
    .setOverlayStyle(axisYStylesHighlight[1])
    .setNibOverlayStyle(axisYStylesHighlight[1])
    // Modify the TickStrategy to remove gridLines from this Y Axis.
    .setTickStrategy(
        // Use Numeric TickStrategy as base.
        AxisTickStrategies.Numeric,
        // Use mutator to modify the TickStrategy.
        (tickStrategy) =>
            tickStrategy
                // Modify Major Tick Style by using a mutator.
                .setMajorTickStyle((tickStyle) => tickStyle.setGridStrokeStyle(emptyLine))
                // Modify Minor Tick Style by using a mutator.
                .setMinorTickStyle((tickStyle) => tickStyle.setGridStrokeStyle(emptyLine)),
    )

// Create series with explicit axes.
const splineSeries1 = chart
    .addSplineSeries({
        xAxis: axisX,
        yAxis: axisY1,
    })
    .setName('TechComp')
    .setStrokeStyle(seriesStrokeStyles[0])
    .setPointFillStyle(() => seriesStrokeStyles[0].getFillStyle())

const splineSeries2 = chart
    .addSplineSeries({
        xAxis: axisX,
        yAxis: axisY2,
    })
    .setName('UniTek')
    .setStrokeStyle(seriesStrokeStyles[1])
    .setPointFillStyle(() => seriesStrokeStyles[1].getFillStyle())

const techcomp = [
    { x: 0, y: 352 },
    { x: 1, y: 352 },
    { x: 2, y: 352 },
    { x: 3, y: 358 },
    { x: 4, y: 400 },
    { x: 5, y: 400 },
    { x: 6, y: 400 },
    { x: 7, y: 400 },
    { x: 8, y: 426 },
    { x: 9, y: 390 },
    { x: 10, y: 390 },
    { x: 11, y: 390 },
    { x: 12, y: 390 },
    { x: 13, y: 360 },
    { x: 14, y: 360 },
    { x: 15, y: 360 },
    { x: 16, y: 500 },
    { x: 17, y: 500 },
    { x: 18, y: 500 },
    { x: 19, y: 600 },
]

const unitek = [
    { x: 0, y: 235 },
    { x: 1, y: 235 },
    { x: 2, y: 335 },
    { x: 3, y: 335 },
    { x: 4, y: 490 },
    { x: 5, y: 490 },
    { x: 6, y: 490 },
    { x: 7, y: 492 },
    { x: 8, y: 550 },
    { x: 9, y: 550 },
    { x: 10, y: 600 },
    { x: 11, y: 600 },
    { x: 12, y: 900 },
    { x: 13, y: 900 },
    { x: 14, y: 900 },
    { x: 15, y: 850 },
    { x: 16, y: 1000 },
    { x: 17, y: 1200 },
    { x: 18, y: 1200 },
    { x: 19, y: 1300 },
]
const dataFrequency = 1000 * 60 * 60 * 24
splineSeries1.add(techcomp.map((point) => ({ x: point.x * dataFrequency * 7, y: point.y })))
splineSeries2.add(unitek.map((point) => ({ x: point.x * dataFrequency * 7, y: point.y })))

// Setup Y views manually (for some extra margins).
axisY1.setInterval({ start: splineSeries1.getYMin() - 10, end: splineSeries1.getYMax() + 10, animate: true })
axisY2.setInterval({ start: splineSeries2.getYMin() - 10, end: splineSeries2.getYMax() + 10, animate: true })

// Enable AutoCursor auto-fill.
chart.setAutoCursor((cursor) => {
    cursor.setResultTableAutoTextStyle(true).setTickMarkerXAutoTextStyle(true).setTickMarkerYAutoTextStyle(true)
})
const legend = chart
    .addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
    // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
    .setAutoDispose({
        type: 'max-width',
        maxWidth: 0.8,
    })

// Add Chart to LegendBox
legend.add(chart)

const parser = (builder, series, Xvalue, Yvalue) => {
    return builder
        .addRow(series.getName())
        .addRow(axisX.formatValue(Xvalue))
        .addRow('Units: ' + Math.floor(Yvalue))
}
splineSeries1.setCursorResultTableFormatter(parser)
splineSeries2.setCursorResultTableFormatter(parser)
