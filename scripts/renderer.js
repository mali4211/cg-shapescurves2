class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // First Bezier curve
        const p0 = {x: 50, y: 200};
        const p1 = {x: 150, y: 100};
        const p2 = {x: 350, y: 100};
        const p3 = {x: 450, y: 200};
        const curveColor1 = [255, 0, 0, 255]; // Red
        this.drawBezierCurve(p0, p1, p2, p3, this.num_curve_sections, curveColor1, framebuffer);
    
        // Show points for the first Bezier curve if show_points is true
        if (this.show_points) {
            this.drawVertex(p0, [0, 0, 0, 255], framebuffer);
            this.drawVertex(p1, [0, 0, 0, 255], framebuffer);
            this.drawVertex(p2, [0, 0, 0, 255], framebuffer);
            this.drawVertex(p3, [0, 0, 0, 255], framebuffer);
        }
    
        // Second Bezier curve
        const p4 = {x: 50, y: 400};
        const p5 = {x: 150, y: 300};
        const p6 = {x: 350, y: 300};
        const p7 = {x: 450, y: 400};
        const curveColor2 = [0, 0, 255, 255]; // Blue
        this.drawBezierCurve(p4, p5, p6, p7, this.num_curve_sections, curveColor2, framebuffer);
    
        //Show points for the second Bezier curve if show_points is true
        if (this.show_points) {
            this.drawVertex(p4, [0, 0, 0, 255], framebuffer);
            this.drawVertex(p5, [0, 0, 0, 255], framebuffer);
            this.drawVertex(p6, [0, 0, 0, 255], framebuffer);
            this.drawVertex(p7, [0, 0, 0, 255], framebuffer);
        }
    }

    // framebuffer:  canvas ctx image data
   // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        let black = [0, 0, 0, 255];
        // Set up circle configurations
        const setupCircles = () => [
            { center: { x: 300, y: 300 }, radius: 200, color: [230, 230, 0, 255] }, // Radius is 200
            { center: { x: 500, y: 300 }, radius: 200, color: [8, 180, 180, 255] }  // Radius changed to 200
        ];

        // Retrieve circle configurations
        const circles = setupCircles();

        // Drawing logic
        circles.forEach(({ center, radius, color }) => {
            this.drawCircle(center, radius, this.num_curve_sections, color, framebuffer);
            if (this.show_points) {
                this.drawVertex(center, black, framebuffer);
            }
        });
    }

    
    
    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // First convex polygon
        const vertices1 = [
            {x: 100, y: 100},
            {x: 200, y: 80},
            {x: 300, y: 120},
            {x: 250, y: 200},
            {x: 150, y: 180}
        ];
        const polygonColor1 = [0, 0, 255, 255]; // Blue
        this.drawConvexPolygon(vertices1, polygonColor1, framebuffer);
    
        // Show vertices for the first polygon if show_points is true
        if (this.show_points) {
            vertices1.forEach(vertex => {
                this.drawVertex(vertex, [0, 0, 0, 255], framebuffer);
            });
        }
    
        // Second convex polygon
        const vertices2 = [
            {x: 400, y: 300},
            {x: 500, y: 280},
            {x: 600, y: 320},
            {x: 550, y: 400},
            {x: 450, y: 380}
        ];
        const polygonColor2 = [255, 0, 255, 255]; // Magenta
        this.drawConvexPolygon(vertices2, polygonColor2, framebuffer);
    
        // Show vertices for the second polygon if show_points is true
        if (this.show_points) {
            vertices2.forEach(vertex => {
                this.drawVertex(vertex, [0, 0, 0, 255], framebuffer);
            });
        }
    }

    // framebuffer:  canvas ctx image data
    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // Adjusted colors for clarity
        const colorR = [255, 0, 0, 255]; // Red
        const colorA = [0, 255, 0, 255]; // Green
        const colorF = [0, 0, 255, 255]; // Blue
        const colorY = [255, 255, 0, 255]; // Yellow for distinction
    
        // Scale factor to make things bigger
        const scaleFactor = 1.5; // Increase the scale factor to make the letters bigger
        const adjust = (value) => Math.floor(value * scaleFactor);
    
        // Drawing "R" 
        this.drawLine({ x: adjust(50), y: adjust(100) }, { x: adjust(50), y: adjust(50) }, colorR, framebuffer); 
        this.drawLine({ x: adjust(50), y: adjust(100) }, { x: adjust(75), y: adjust(100) }, colorR, framebuffer); 
        this.drawLine({ x: adjust(75), y: adjust(100) }, { x: adjust(75), y: adjust(75) }, colorR, framebuffer); 
        this.drawLine({ x: adjust(75), y: adjust(75) }, { x: adjust(50), y: adjust(75) }, colorR, framebuffer); 
        this.drawLine({ x: adjust(50), y: adjust(75) }, { x: adjust(75), y: adjust(50) }, colorR, framebuffer); 
    
        // Drawing "F"
        this.drawLine({ x: adjust(125), y: adjust(50) }, { x: adjust(125), y: adjust(100) }, colorF, framebuffer); 
        this.drawLine({ x: adjust(125), y: adjust(100) }, { x: adjust(150), y: adjust(100) }, colorF, framebuffer);
        this.drawLine({ x: adjust(125), y: adjust(75) }, { x: adjust(150), y: adjust(75) }, colorF, framebuffer); 
    
        
        // Drawing First "A"
        this.drawLine({ x: adjust(85), y: adjust(50) }, { x: adjust(100), y: adjust(100) }, colorA, framebuffer); 
        this.drawLine({ x: adjust(100), y: adjust(100) }, { x: adjust(115), y: adjust(50) }, colorA, framebuffer); 
        this.drawLine({ x: adjust(90), y: adjust(75) }, { x: adjust(110), y: adjust(75) }, colorA, framebuffer);
    
        // Drawing second "A"
        this.drawLine({ x: adjust(160), y: adjust(50) }, { x: adjust(175), y: adjust(100) }, colorA, framebuffer); 
        this.drawLine({ x: adjust(175), y: adjust(100) }, { x: adjust(190), y: adjust(50) }, colorA, framebuffer); 
        this.drawLine({ x: adjust(165), y: adjust(75) }, { x: adjust(185), y: adjust(75) }, colorA, framebuffer); 
    
        // Drawing "Y"
        this.drawLine({ x: adjust(200), y: adjust(100) }, { x: adjust(215), y: adjust(75) }, colorY, framebuffer); 
        this.drawLine({ x: adjust(215), y: adjust(75) }, { x: adjust(230), y: adjust(100) }, colorY, framebuffer); 
        this.drawLine({ x: adjust(215), y: adjust(75) }, { x: adjust(215), y: adjust(50) }, colorY, framebuffer); 
    }
    
    
    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        let t_step = 1.0 / num_edges;
        let pPoint = p0;
        // Draw the first point if show_points is true
    
        if (this.show_points) {
            this.drawVertex(p0, color, framebuffer);
        }
        // Draw the Bezier curve
    
        for (let i = 1; i <= num_edges; i++) {
            let t = i * t_step;
            let x = Math.pow(1 - t, 3) * p0.x + 
                    3 * Math.pow(1 - t, 2) * t * p1.x + 
                    3 * (1 - t) * Math.pow(t, 2) * p2.x + 
                    Math.pow(t, 3) * p3.x;
            let y = Math.pow(1 - t, 3) * p0.y + 
                    3 * Math.pow(1 - t, 2) * t * p1.y + 
                    3 * (1 - t) * Math.pow(t, 2) * p2.y + 
                    Math.pow(t, 3) * p3.y;
            let currentPoint = { x: Math.round(x), y: Math.round(y) };
            // Draw the line segment
    
            this.drawLine(pPoint, currentPoint, color, framebuffer);
    
            if (this.show_points) {
                this.drawVertex(currentPoint, color, framebuffer);
            }
    
            pPoint = currentPoint;
        }
    }
    
    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    // framebuffer:  canvas ctx image data
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_curve_sections, color, framebuffer) {
        // Draw the circle using trigonometry
        let angleStep = (2 * Math.PI) / num_curve_sections;
        let points = [];
    
        // Calculate points along the circumference of the circle
        for (let i = 0; i < num_curve_sections; i++) {
            let angle = i * angleStep;
            let x = center.x + radius * Math.cos(angle);
            let y = center.y + radius * Math.sin(angle);
            points.push({ x: Math.round(x), y: Math.round(y) });
        }
    
        // Connect the points to form the circle
        for (let i = 0; i < points.length - 1; i++) {
            this.drawLine(points[i], points[i + 1], color, framebuffer);
            if (this.show_points) {
                this.drawVertex(points[i], color, framebuffer);
            }
        }
        // Connect the last point to the first point to close the circle
        this.drawLine(points[num_curve_sections - 1], points[0], color, framebuffer);
        if (this.show_points) {
            this.drawVertex(points[num_curve_sections - 1], color, framebuffer);
        }
    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        for (let i = 1; i < vertex_list.length - 1; i++) {
            this.drawTriangle(vertex_list[0], vertex_list[i], vertex_list[i + 1], color, framebuffer);
        }
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        let size = 4;
        for (let dx = -size; dx <= size; dx++) {
            for (let dy = -size; dy <= size; dy++) {
                this.setFramebufferColor(color, v.x + dx, v.y + dy, framebuffer);
            }
        }
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(color, x, y, framebuffer) {
	    let p_idx = this.pixelIndex(x, y, framebuffer);
        for (let i = 0; i < 4; i++) {
            framebuffer.data[p_idx + i] = color[i];
        }
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                                // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }
    
    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1; // y increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let y = y0;
        for (let x = x0; x <= x1; x++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                y += iy;
            }
        }
    }
    
    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1; // x increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let x = x0;
        for (let y = y0; y <= y1; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy, then sort points in ascending y order
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};

export { Renderer };
