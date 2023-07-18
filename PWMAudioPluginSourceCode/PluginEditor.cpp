/*
  ==============================================================================

    This file contains the basic framework code for a JUCE plugin editor.

  ==============================================================================
*/

#include "PluginProcessor.h"
#include "PluginEditor.h"

//==============================================================================
PWMattemptAudioProcessorEditor::PWMattemptAudioProcessorEditor (PWMattemptAudioProcessor& p)
    : AudioProcessorEditor (&p), audioProcessor (p)
{
    setSize (500, 500);


    //add the pulse width slider
    addAndMakeVisible(pulseWidthSlider);
    pulseWidthSlider.setSliderStyle(juce::Slider::RotaryVerticalDrag);
    pulseWidthSlider.setTextBoxStyle(juce::Slider::NoTextBox, false, 80, 20);
    pulseWidthSlider.setRange(0.0, 1.0,0.01);
    pulseWidthSlider.setValue(0.5);
    pulseWidthSlider.addListener(this);

}




PWMattemptAudioProcessorEditor::~PWMattemptAudioProcessorEditor()
{
}

//==============================================================================
void PWMattemptAudioProcessorEditor::paint (juce::Graphics& g)
{
    // (Our component is opaque, so we must completely fill the background with a solid colour)
    g.fillAll (getLookAndFeel().findColour (juce::ResizableWindow::backgroundColourId));
}

void PWMattemptAudioProcessorEditor::resized()
{
    // This is generally where you'll want to lay out the positions of any
    // subcomponents in your editor
    pulseWidthSlider.setBounds(getLocalBounds());
}

//create new function for changing the slider value
void PWMattemptAudioProcessorEditor::sliderValueChanged(juce::Slider* slider) {
    if (slider == &pulseWidthSlider) {
        audioProcessor.pulseWidthModAmount = pulseWidthSlider.getValue();
    }
}