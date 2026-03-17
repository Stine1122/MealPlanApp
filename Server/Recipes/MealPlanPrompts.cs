namespace MyApp.Prompts;

public static class MealPlanPrompts
{

    public static string RulesPrompt()
    {
        return """
        VIGTIGSTE REGLER (SKAL ALTID OVERHOLDES):
        1. Allergier er af absolut højeste prioritet
        2. Nedenstående ønsker fra brugeren har absolut andenhøjeste prioritet.
        3. Hvis der opstår konflikt mellem allergier, brugerens ønsker og andre krav,
        skal allergier altid vælges.
        """;
    }

    public static string GeneralPrompt(List<string> fridge, List<string> freezer, string extraPrompt, int days, List<string> allergies, List<string> shoppinglist)
    {
        return $"""

        ALLERGIER:
        {string.Join(", ", allergies)}

        BRUGERENS ØNSKER:
        {extraPrompt}

        ØVRIGE KRAV TIL MADPLANEN:
        Foretræk at bruge ingredienser fra mit køleskab:
        {string.Join(", ", fridge)}

        Foretræk at bruge ingredienser fra min fryser:
        {string.Join(", ", freezer)}

        Hvis en ingrediens fra køleskab eller fryser allerede er brugt i en tidligere opskrift, må den ikke bruges igen i resten af madplanen.

        Andre ingredienser må meget gerne også tilføjes hvis det passer godt ind i opskrifterne. Disse ingredienser må meget gerne genbruges.

        TIDSOPLYSNINGER:
        Husk at tilføje både forberedelsestid, tilberedningstid (som skal under bake_time_minutes i schema) og totale tid.

        INDKØBSLISTE OPLYSNINGER:
        Tilføj de ingredienser som du ikke kunne finde i køleskab eller fryser til shoppinglist i schema. Hvis en ingrediens allerede er på indkøbslisten i et andet objekt i json-arrayet, må den ikke tilføjes igen.
        Disse ingredienser er allerede på indkøbslisten:
        {string.Join(", ", shoppinglist)}

        SPECIFIKKE INGREDIENSER:
        Ingredienser som salt, peber, olie og andre krydderier må meget gerne bruges igen, og skal IKKE på Indkøbslisten.


        OUTPUT FORMAT:
        Returner KUN en JSON-array med {days} objekter der matcher schema.

        """;
    }

    public static string EachDay(List<string> fridge, List<string> freezer, string extraPrompt, int persons, List<string> allergies, List<string> shoppinglist)
    {
        return $"""
        {RulesPrompt()}

        Generer en ugentlig madplan med præcis 7 opskrifter.
        
        Brug disse dage i madplanen:
        Mandag, Tirsdag, Onsdag, Torsdag, Fredag, Lørdag, Søndag

        Hver dag skal være en opskrift til {persons} personer.

        {GeneralPrompt(fridge, freezer, extraPrompt, 7, allergies, shoppinglist)}
        """;
    }

    public static string TwoDay(List<string> fridge, List<string> freezer, string extraPrompt, int persons, List<string> allergies, List<string> shoppinglist)
    {
        return $"""
        {RulesPrompt()}

        Generer en ugentlig madplan med præcis 4 opskrifter.

        Brug disse dage i madplanen:
        Mandag, Onsdag, Fredag, Søndag.

        Tilføj IKKE disse dage i madplanen:
        Tirsdag, Torsdag og Lørdag.

        Opskrifterne til mandag, onsdag og fredag skal være en opskrift til {persons*2} personer.

        Opskriften til søndag skal være en opskrift til {persons} personer.

        {GeneralPrompt(fridge, freezer, extraPrompt, 4, allergies, shoppinglist)}
        """;
    }
}