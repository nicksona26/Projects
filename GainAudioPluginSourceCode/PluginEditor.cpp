/*
  ==============================================================================

    This file contains the basic framework code for a JUCE plugin editor.

  ==============================================================================
*/

#include "PluginProcessor.h"
#include "PluginEditor.h"

//==============================================================================
GainPluginAudioProcessorEditor::GainPluginAudioProcessorEditor (GainPluginAudioProcessor& p)
    : AudioProcessorEditor (&p), audioProcessor (p)
{
    setSize (200, 400);
    //add style to the slider
    gainSlider.setSliderStyle(juce::Slider::SliderStyle::LinearVertical);
    gainSlider.setTextBoxStyle(juce::Slider::TextBoxBelow, true, 100, 25);
    //standard range for sliders
    gainSlider.setRange(-48.0, 0.0);
    gainSlider.setValue(-1.0);
    gainSlider.addListener(this);
    //make the slider visible
    addAndMakeVisible(gainSlider);
}

GainPluginAudioProcessorEditor::~GainPluginAudioProcessorEditor()
{
}

//==============================================================================
void GainPluginAudioProcessorEditor::paint (juce::Graphics& g)
{
    // (Our component is opaque, so we must completely fill the background with a solid colour)
    g.fillAll (getLookAndFeel().findColour (juce::ResizableWindow::backgroundColourId));
}

void GainPluginAudioProcessorEditor::resized()
{
    // This is generally where you'll want to lay out the positions of any
    // subcomponents in your editor..
    gainSlider.setBounds(getLocalBounds());
}

//create new function for changing slider value
void GainPluginAudioProcessorEditor::sliderValueChanged(juce::Slider* slider) {
    if (slider == &gainSlider) {
        audioProcessor.rawVolume = pow(10, gainSlider.getValue() / 20);
    }
}