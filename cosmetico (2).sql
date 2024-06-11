-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tempo de Geração: 11/06/2024 às 21h53min
-- Versão do Servidor: 5.5.20
-- Versão do PHP: 5.3.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de Dados: `cosmetico`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `fornecedor`
--

CREATE TABLE IF NOT EXISTS `fornecedor` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `cnpj` int(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  `endereco` varchar(50) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE IF NOT EXISTS `produto` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `descricao` varchar(50) NOT NULL,
  `valor` float(8,2) NOT NULL,
  `quantidade` int(5) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `foto` varchar(100) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`codigo`, `nome`, `descricao`, `valor`, `quantidade`, `tipo`, `marca`, `categoria`, `foto`) VALUES
(1, 'Batom Malva Oriente', 'Batom Avon cor malva oriente', 29.99, 1, 'feminino', 'avon', 'maquiagem', 'https://production.na01.natura.com/on/demandware.static/-/Sites-avon-br-storefront-catalog/default/d'),
(2, 'Natura Homem Essence', 'Natura Homem Essence exala um aroma amadeirado int', 139.00, 1, 'masculino', 'natura', 'perfumaria', 'https://fraguru.com/mdimg/perfume/375x500.40309.jpg'),
(3, 'Condicionador Suave Boti Baby', 'especialmente desenvolvido para o cabelo fino e de', 39.00, 1, 'infantil', 'oboticario', 'cabelos', 'https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_800/'),
(4, 'Esmalte Lirio Branco ', 'Esmalte Risque cor lirio branco', 9.00, 1, 'unissex', 'risque', 'unhas', 'https://cdn.ultrafarma.com.br/static/produtos/821655/large-638138867497232688-821655_5.png'),
(5, 'Sombra Mono Faces', 'Sombra Mono Faces Natura cor rosa like', 36.90, 1, 'feminino', 'natura', 'maquiagem', 'https://acdn.mitiendanube.com/stores/002/798/021/products/sombra-mono-faces-rosa-like1-332a6b5ea7173');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto_fornecedor`
--

CREATE TABLE IF NOT EXISTS `produto_fornecedor` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `codproduto` int(5) NOT NULL,
  `codfornecedor` int(5) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `codproduto` (`codproduto`),
  KEY `codfornecedor` (`codfornecedor`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto_fornecido`
--

CREATE TABLE IF NOT EXISTS `produto_fornecido` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `codproduto` int(5) NOT NULL,
  `quantidade` int(5) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `codproduto` (`codproduto`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`codigo`, `nome`, `email`, `senha`, `role`) VALUES
(2, 'bilon', 'bilon@gmail.com', 'bilon123', 'user');

-- --------------------------------------------------------

--
-- Estrutura da tabela `venda`
--

CREATE TABLE IF NOT EXISTS `venda` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `codproduto` int(5) NOT NULL,
  `codusuario` int(5) NOT NULL,
  `quantidade` int(5) NOT NULL,
  `valor` float(8,2) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `codproduto` (`codproduto`),
  KEY `codusuario` (`codusuario`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
