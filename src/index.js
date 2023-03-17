import './styles/index.css';
import Model from './modules/model';
import View from './modules/view';
import Controller from './modules/controller';

const modals = [
    {
        type: 'coffee',
        title: 'Coffee',
        text: 'Coffee is a drink prepared from roasted coffee beans. Darkly colored, bitter, and slightly acidic, '
            + 'coffee has a stimulating effect on humans, primarily due to its caffeine content. It has the highest '
            + 'sales in the world market for hot drinks.\n\nSeeds of the Coffea plant\'s fruits are separated to '
            + 'produce unroasted green coffee beans. The beans are roasted and then ground into fine particles that '
            + 'are typically steeped in hot water before being filtered out, producing a cup of coffee. It is usually '
            + 'served hot, although chilled or iced coffee is common. Coffee can be prepared and presented in a variety '
            + 'of ways (e.g., espresso, French press, caffè latte, or already-brewed canned coffee). Sugar, sugar '
            + 'substitutes, milk, and cream are often used to mask the bitter taste or enhance the flavor.',
        buttonName: 'coffee',
    },
    {
        type: 'tea',
        title: 'Tea',
        text: 'Tea is an aromatic beverage prepared by pouring hot or boiling water over cured or fresh leaves '
            + 'of Camellia sinensis, an evergreen shrub native to East Asia which probably originated in the '
            + 'borderlands of southwestern China and northern Myanmar. Tea is also rarely made from the leaves of '
            + 'Camellia taliensis. After plain water, tea is the most widely consumed drink in the world. There are '
            + 'many different types of tea; some have a cooling, slightly bitter, and astringent flavour, while others '
            + 'have vastly different profiles that include sweet, nutty, floral, or grassy notes. Tea has a stimulating '
            + 'effect in humans primarily due to its caffeine content.',
        buttonName: 'tea',
    },
    {
        type: 'milk',
        title: 'Milk',
        text: 'Milk is a white liquid food produced by the mammary glands of mammals. It is the primary source of '
            + 'nutrition for young mammals (including breastfed human infants) before they are able to digest solid '
            + 'food. Immune factors and immune-modulating components in milk contribute to milk immunity. '
            + 'Early-lactation milk, which is called colostrum, contains antibodies that strengthen the immune system, '
            + 'and thus reduces the risk of many diseases. Milk contains many nutrients, including protein and lactose.',
        buttonName: 'milk',
    },
];

const app = new Controller(new Model(modals), new View());
