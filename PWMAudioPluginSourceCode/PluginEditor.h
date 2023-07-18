/*
  ==============================================================================

    This file contains the basic framework code for a JUCE plugin editor.

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>
#include "PluginProcessor.h"

//==============================================================================
/**
*/
class PWMattemptAudioProcessorEditor  : public juce::AudioProcessorEditor, public juce::Slider::Listener
{
public:
    PWMattemptAudioProcessorEditor (PWMattemptAudioProcessor&);
    ~PWMattemptAudioProcessorEditor() override;

    //==============================================================================
    void paint (juce::Graphics&) override;
    void resized() override;

    void sliderValueChanged(juce::Slider* slider);

private:
    // GUI components
    juce::Slider pulseWidthSlider;
    
    // access the processor object that created it / reference to the audio processor
    PWMattemptAudioProcessor& audioProcessor;


    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (PWMattemptAudioProcessorEditor)
};
