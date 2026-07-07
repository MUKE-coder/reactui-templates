import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomSheet({
  visible,
  onClose,
  children,
}: BottomSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50 justify-end">
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
              <View className="bg-white rounded-t-3xl px-4 pb-8 pt-3">
                <View className="w-8 h-1 bg-neutral-300 rounded-full self-center mb-4" />
                {children}
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
