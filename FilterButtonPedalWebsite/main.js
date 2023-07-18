// The array containing pedal objects
const pedals = [
    {
        id: 1,
        title: "AudioHead X1 Distortion Pedal",
        category: "Distortion",
        price: "$90",
        img: "./images/distortion1.jpg",
        desc: "The AudioHead X1 Distortion Pedal is our first release of a distortion pedal. It features three control knobs; distortion, tone, and level. Our design promises a rich distortion to achieve a high gain sound no other pedal can match."
    },

    {
        id: 2,
        title: "AudioHead X2 Distortion Pedal",
        category: "Distortion",
        price: "$120",
        img: "./images/distortion2.jpg",
        desc: "The AudioHead X2 Distortion Pedal is our second release of a distortion pedal. In contrast to our first release, the X2 includes a gate compression knob to achieve a tighter sound."
    },

    {
        id: 3,
        title: "AudioHead Swarm BO4",
        category: "Fuzz",
        price: "$60",
        img: "./images/fuzz1.jpg",
        desc: "The AudioHead Swarm BO4 is like no other fuzz before it. With it's layering capabilities, the Swarm BO4 mimicks the sound of a thousand bees swarming at once. "
    },

    {
        id: 4,
        title: "AudioHead Plasma Coil",
        category: "Fuzz",
        price: "$300",
        img: "./images/fuzz2.jpg",
        desc: "The AudioHead Plasma Coil is a one of a kind design that uses a Xenon Gas tube filled with electrical discharge to achieve an audio signal of the like to a gated fuzz sound never heard before."
    },

    {
        id: 5,
        title: "AudioHead Phaser 1",
        category: "Phaser",
        price: "$40",
        img: "./images/phase1.jpg",
        desc: "The AudioHead Phaser 1 is a classic phaser pedal. However, instead of phasing over the top of the audio signal it combines the signal with an auto-generated phase to create a wholer sound. Other phaser pedals will layer the signals, which leads to the phase sounding seperate from the orignial audio signal."
    },

    {
        id: 6,
        title: "AudioHead Phaser 2",
        category: "Phaser",
        price: "$60",
        img: "./images/phase2.jpg",
        desc: "The AudioHead Phaser 2 includes all the designs from our Phaser 1 pedal plus an additional expression pedal to control the phase while performing."
    },

    {
        id: 7,
        title: "AudioHead Compressor V2",
        category: "Compression",
        price: "$50",
        img: "./images/compressor1.jpg",
        desc: "The AudioHead Compressor V2 mimicks the classic OTT compressor plugin. With its touch screen control display you can control the compression and gain of the highs, mids, and lows."
    },

    {
        id: 8,
        title: "AudioHead Compressor V3",
        category: "Compression",
        price: "$70",
        img: "./images/compressor2.jpg",
        desc: "The AudioHead Compressor V3's digital design allows you to layer and design multiple OTT compressors within one pedal. "
    },

    {
        id: 9,
        title: "AudioHead Synthesizer Pedal V1",
        category: "Synth",
        price: "$140",
        img: "./images/synth1.jpg",
        desc: "The AudioHead Synthesizer Pedal V1 has superior tracking capabilities compared to any other synth pedal before it. With over 50 synthesizer sounds you are able to craft and layer nearly 500 synthesizer sound variations."
    },

    {
        id: 10,
        title: "AudioHead Synthesizer Pedal V2",
        category: "Synth",
        price: "$160",
        img: "./images/synth2.jpg",
        desc: "The AudioHead Synthesizer Pedal V2 includes a digital screen that allows you to design any synth sound you can think of. Unlike the the V1, the V2 does not have pre-selected presets, giving the user freedom to design whatever sound they please. The V2 also includes a selector board that allows you to assign a created synth sound to up to 20 stomp box's. This allows the user to easily switch between sounds while performing."
    },
];

// Get the parent element where the pedal items will be displayed
const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

// Display all pedal items when the page loads
window.addEventListener("DOMContentLoaded", function () {
    displayPedalItems(pedals);
    displayPedalButtons();
});

// Function 1: Display pedal items on the page
function displayPedalItems(pedalItems) {
    let displayPedals = pedalItems.map(function (item) {
        return `<article class="pedal-item">
        <img src=${item.img} alt=${item.title} class="photo" />
        <div class="pedal-info">
            <header>
                <h4 id="pedal-title">${item.title}</h4>
                <h4 class="price">${item.price}</h4>
            </header>
            <p class="pedal-text">
                ${item.desc}
            </p>
        </div>
    </article>`;
    });
    displayPedals = displayPedals.join("");
    sectionCenter.innerHTML = displayPedals;
}

// Function 2: Display filter buttons for pedal categories
function displayPedalButtons() {
    // Extract unique categories from the pedals array
    const categories = pedals.reduce(
        function (values, item) {
            if (!values.includes(item.category)) {
                values.push(item.category);
            }
            return values;
        },
        ["All"]
    );

    // Generate the HTML for filter buttons based on the categories
    const categoryBtns = categories
        .map(function (category) {
            return `<button type="button" class="filter-btn" data-id=${category}>
            ${category}
        </button>`;
        })
        .join("")

    btnContainer.innerHTML = categoryBtns;
    const filterBtns = btnContainer.querySelectorAll(".filter-btn");

    filterBtns.forEach(function (btn) {
        // Add click event listener to each filter button
        btn.addEventListener("click", function (e) {
            const category = e.currentTarget.dataset.id;
            // Filter pedals based on the selected category
            const pedalCategory = pedals.filter(function (pedalItem) {
                if (pedalItem.category === category) {
                    return pedalItem;
                }
            });
            // Display all pedals if the "All" category is selected, else display filtered pedals
            if (category === "All") {
                displayPedalItems(pedals);
            } else {
                displayPedalItems(pedalCategory);
            }
        });
    });
}