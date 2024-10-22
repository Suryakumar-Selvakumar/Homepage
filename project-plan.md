**Given your inputs, what are the steps necessary to return the desired output?**

1.1. Use previous index.html with just body. Body should have 100% height not 100vh

1.2. Start with the mobile layout.

2.1. Get pictures from pexels.com to use as placeholders

2.2. I’ll stick to Playfair Display and Roboto for now.

2.3. Get GitHub, LinkedIn and Instagram icons from devicon.dev

2.4. Obviously for all other SVGs, go to materialdesignicons.com

3.1. Design the Overall layout first, then you can design the finer details. I’ll start mobile first and expand out from there.
 

**MOBILE LAYOUT:** Each point is a seperate element with their individual children. Develop the page with the viewport at 500px width to simulate a mobile screen.

1. Header section with Image div and about div.

	1.1. Add a div for the image and name

    1.2. Make header’s background color slanted – use skew

    1.3. About me Section

		1.3.1 Just a regular para element
		1.3.2. A div for the buttons
			i) Three buttons for each link

2. Main section - Use a grid to create one column and 6 rows

	2.1 Have each row take one project card.

		2.1.1. Each project card has:
            i) A div for the project screenshot.
            ii) A div to contain all the project details with one background color.
	            ii.a. One div for project name and links
		            ii.a.1. p for project name
		            ii.a.2. 2x img tags for links
	            ii.b. One para for the description.

3. Footer Section at the end – Use flex

    3.1. h1 for “Contact me” text

    3.2. One para for intro text

    3.3. One div for address

        3.3.1. One para for ½ address
        3.3.2. One para for other half

    3.4. One para for phone no.

    3.5. One para for email

    3.6. One div for the nav links

    3.7. Finally a div for the person image.


**TABLET LAYOUT:** Develop the page with the viewport at 1000px width to simulate a mobile screen.

1. Header section with Image div and about div.

    1.1. Try creating two columns with grid and you can use relative positioning to get the layout you want. Either move the image right or move the about section left. See if the text wraps, if it doesn’t then use flex and z-index.

    1.2. With flex – you’d have to find a way to give indents to the text such that it matches the space available and flows over to the next line.

    1.3. For the name text it can stay inside person-image but use align-items: end, justify-content: start, some padding and some relative positioning to achieve the layout you want.

2. Main section with My work

    2.1. Use text-align: left or justify to move h1 to the left

    2.2. For the my-work section, You can set a fixed-width for the project cards and try flex-wrap and see how that works.

    2.3. If that doesn’t give you the results you want, then simply switch to grid and create 2 columns and 3 rows and give each project to one cell.

3. Footer Section

    3.1. Use grid to create 2 columns. One column is section contact-me and other column is section person-image-one

    3.2. Contact me can stay as is. Just change h1 and nav-links position from center to start and add icons for phone no. and email using before or as an actual svg element.

    3.3. The image now needs a width and just give the section some padding from the top or use margin-top. Both would work I think.

**DESKTOP LAYOUT**

1. Header Section

    1.1. You can use the same grid from tablet layout.

    1.2. Use desktop image for the image.

    1.3. Move the name text back to the bottom.

    1.4. Adjust the skewed section if necessary.

    1.5. Make the about-me section longer

    1.6. the nav-links appear again.

    1.7. Have h1 and p of about-me have the same offset.

2. Main Section

    2.1. I think the current settings set for the tablet layout should work for this one as well.

3. Footer Section

    3.1. Same settings from the tablet layout should work. Split the section appropriately as per image.

    3.2. Have the image take a responsive width.

    3.3. Make the font size of all the contact-details responsive. That’s it!