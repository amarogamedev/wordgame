import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    IconButton,
    Flex,
} from '@chakra-ui/react'
import { GithubLogo, LinkedinLogo, SteamLogo } from '@phosphor-icons/react';
import { useEffect } from 'react';

export const ModalBemVindo = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        onOpen();
    }, [onOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Welcome to WordGame!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                </ModalBody>
                    <Text px={4}>
                        Hello! My name is Luis and this is a small project I made to learn React and Chakra UI!<br/><br/>
                        Here all my links:
                    </Text>
                <ModalFooter justifyContent={'space-between'}>
                    <Flex gap={2}>
                        <IconButton aria-label='github' onClick={() => window.open('https://github.com/amarogamedev')}>
                            <GithubLogo size={24} color='themeDarkGrey'/>
                        </IconButton>
                        <IconButton aria-label='github' onClick={() => window.open('https://www.linkedin.com/in/luisfellipeamaro/')}>
                            <LinkedinLogo size={24} color='themeDarkGrey'/>
                        </IconButton>
                        <IconButton aria-label='github' onClick={() => window.open('https://store.steampowered.com/developer/punxstudios')}>
                            <SteamLogo size={24} color='themeDarkGrey'/>
                        </IconButton>
                    </Flex>
                    <Button backgroundColor={"themeGreen"} color={'themeDarkGrey'} mr={3} onClick={onClose}>
                        Play
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}