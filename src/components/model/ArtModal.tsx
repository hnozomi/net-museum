import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';
import { FC } from 'react';

type Props = Omit<ModalProps, 'children'>;

export const ArtModal: FC<Props> = ({ isOpen, onClose, ...props }) => {
  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>A Knight of Alcántara or Calatrava</ModalHeader>
        <ModalCloseButton />

        <ModalBody>Murillo, Bartolomé Estebán</ModalBody>
        <ModalBody>Spanish</ModalBody>
        <Image src="https://images.metmuseum.org/CRDImages/ep/original/DP223490.jpg" />
        <a
          href="https://example.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          詳細を見に行く
        </a>
      </ModalContent>
    </Modal>
  );
};
