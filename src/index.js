/*
 * LightningChartJS example that showcases sharing an Axis between two series.
 *  Also, styling of chart zooming rectangle & axes.
 */
// Import LightningChartJS
const lcjs = require('@lightningchart/lcjs')

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
    emptyFill,
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

// Create a XY Chart.
const chart = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
    .ChartXY({
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
    })
    .setTitle('Unit production comparison')

// Cache reference to default axes and style them.
const axisX = chart
    .getDefaultAxisX()
    .setOverlayStyle(axisXStyleHighlight)
    // Set the X Axis to use DateTime TickStrategy and set the interval
    .setTickStrategy(AxisTickStrategies.DateTime)
    .setInterval({
        start: new Date(2018, 1, 5).getTime(),
        end: new Date(2018, 1, 24).getTime(),
    })

// Style the default Y Axis.
const axisY1 = chart
    .getDefaultAxisY()
    .setStrokeStyle(axisYStrokeStyles[0])
    .setOverlayStyle(axisYStylesHighlight[0])
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
    .addPointLineAreaSeries({
        dataPattern: 'ProgressiveX',
        xAxis: axisX,
        yAxis: axisY1,
    })
    .setName('TechComp')
    .setCurvePreprocessing({ type: 'spline' })
    .setStrokeStyle(seriesStrokeStyles[0])
    .setPointFillStyle(() => seriesStrokeStyles[0].getFillStyle())
    .setAreaFillStyle(emptyFill)

const splineSeries2 = chart
    .addPointLineAreaSeries({
        dataPattern: 'ProgressiveX',
        xAxis: axisX,
        yAxis: axisY2,
    })
    .setName('UniTek')
    .setCurvePreprocessing({ type: 'spline' })
    .setStrokeStyle(seriesStrokeStyles[1])
    .setPointFillStyle(() => seriesStrokeStyles[1].getFillStyle())
    .setAreaFillStyle(emptyFill)

const techcomp = [
    { x: new Date(2018, 1, 5).getTime(), y: 352 },
    { x: new Date(2018, 1, 6).getTime(), y: 352 },
    { x: new Date(2018, 1, 7).getTime(), y: 352 },
    { x: new Date(2018, 1, 8).getTime(), y: 358 },
    { x: new Date(2018, 1, 9).getTime(), y: 400 },
    { x: new Date(2018, 1, 10).getTime(), y: 400 },
    { x: new Date(2018, 1, 11).getTime(), y: 400 },
    { x: new Date(2018, 1, 12).getTime(), y: 400 },
    { x: new Date(2018, 1, 13).getTime(), y: 426 },
    { x: new Date(2018, 1, 14).getTime(), y: 390 },
    { x: new Date(2018, 1, 15).getTime(), y: 390 },
    { x: new Date(2018, 1, 16).getTime(), y: 390 },
    { x: new Date(2018, 1, 17).getTime(), y: 390 },
    { x: new Date(2018, 1, 18).getTime(), y: 360 },
    { x: new Date(2018, 1, 19).getTime(), y: 360 },
    { x: new Date(2018, 1, 20).getTime(), y: 360 },
    { x: new Date(2018, 1, 21).getTime(), y: 500 },
    { x: new Date(2018, 1, 22).getTime(), y: 500 },
    { x: new Date(2018, 1, 23).getTime(), y: 500 },
    { x: new Date(2018, 1, 24).getTime(), y: 600 },
]

const unitek = [
    { x: new Date(2018, 1, 5).getTime(), y: 235 },
    { x: new Date(2018, 1, 6).getTime(), y: 235 },
    { x: new Date(2018, 1, 7).getTime(), y: 335 },
    { x: new Date(2018, 1, 8).getTime(), y: 335 },
    { x: new Date(2018, 1, 9).getTime(), y: 490 },
    { x: new Date(2018, 1, 10).getTime(), y: 490 },
    { x: new Date(2018, 1, 11).getTime(), y: 490 },
    { x: new Date(2018, 1, 12).getTime(), y: 492 },
    { x: new Date(2018, 1, 13).getTime(), y: 550 },
    { x: new Date(2018, 1, 14).getTime(), y: 550 },
    { x: new Date(2018, 1, 15).getTime(), y: 600 },
    { x: new Date(2018, 1, 16).getTime(), y: 600 },
    { x: new Date(2018, 1, 17).getTime(), y: 900 },
    { x: new Date(2018, 1, 18).getTime(), y: 900 },
    { x: new Date(2018, 1, 19).getTime(), y: 900 },
    { x: new Date(2018, 1, 20).getTime(), y: 850 },
    { x: new Date(2018, 1, 21).getTime(), y: 1000 },
    { x: new Date(2018, 1, 22).getTime(), y: 1200 },
    { x: new Date(2018, 1, 23).getTime(), y: 1200 },
    { x: new Date(2018, 1, 24).getTime(), y: 1300 },
]

// Add data to series
splineSeries1.add(techcomp)
splineSeries2.add(unitek)

const legend = chart
    .addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
    // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
    .setAutoDispose({
        type: 'max-width',
        maxWidth: 0.8,
    })

// Add Chart to LegendBox
legend.add(chart)
