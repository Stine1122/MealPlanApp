namespace MyApp.Prompts;

public static class MealPlanPrompts
{

    public static string RulesPrompt()
    {
        return """
        VIGTIGSTE REGLER (SKAL ALTID OVERHOLDES):
        1. Allergier er af absolut højeste prioritet
        2. Brugerens specifikke ønske er af absolut andenhøjeste prioritet
        3. Hvis der opstår konflikt mellem allergier, brugerens ønsker og andre krav, skal allergier altid vælges.
        4. Du må gerne ændre på antal personer eller ingredienser, hvis der er modstridende ønsker

        Hvis brugerens forespørgsel indeholder modstridende ønsker eller krav
        (f.eks. kostrestriktioner vs. ønsket ret, antal portioner vs. angivet
        antal personer), må du ikke stille ændre den ene uden at nævne det.

        Inkluder i stedet altid en kort forklaring i "message"-feltet, der beskriver:
        - Hvad konflikten bestod i
        - Hvilken præference du prioriterede og hvorfor
        - Hvad du ændrede som følge af det (f.eks. justerede portioner fra 10 til 2)

        Hvis der ingen konflikter er skal "message"-feltet være tomt.

        Eksempel på en konfliktbesked (brug aldrig "jeg" i beskeden):
        "Du bad om en opskrift til 2 personer, men nævnte også at du laver mad
        til hele familien på 5. Portionerne er justeret til 5 personer."
        eller
        "Du bad om en opskrift til 100 personer, men nævnte også at du laver mad
        hvor du maksimalt må handle for 10 kr. Portionerne er justeret til 2 personer
        baseret på mængden af mad du har i køleskab, fryser og spisekammer."
        """;
    }

    public static string GeneralPrompt(List<string> fridge, List<string> freezer, List<string> pantry, int days, List<string> allergies, List<string> shoppinglist, string extraPrompt)
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

        Foretræk at bruge ingredienser fra mit spisekammer:
        {string.Join(", ", pantry)}

        Brug KUN realistiske mængder af ingredienserne - uanset hvor meget der er på lager. 
        Hvis der fx er 100 løg, skal du stadig kun bruge 2-3 løg i en opskrift hvis det er passende.
        Mængden i køleskab/fryser/spisekammer er blot en indikation af hvad der er tilgængeligt, ikke hvor meget der skal bruges.

        Andre ingredienser må meget gerne også tilføjes hvis det passer godt ind i opskrifterne. Disse ingredienser må meget gerne genbruges.

        TIDSOPLYSNINGER:
        Husk at tilføje både forberedelsestid, tilberedningstid (som skal under cooking_time_minutes i schema) og totale tid.

        INDKØBSLISTE OPLYSNINGER:
        Tilføj de ingredienser som du ikke kunne finde i køleskab, fryser eller spisekammer til shoppinglist i schema.
        Disse ingredienser er allerede tilgængelige og må IKKE tilføjes til indkøbslisten:
        {string.Join(", ", shoppinglist)}

        SPECIFIKKE INGREDIENSER:
        Ingredienser som salt, peber, olie og andre krydderier må meget gerne bruges igen, og skal IKKE på Indkøbslisten.


        OUTPUT FORMAT:
        Returner KUN en JSON-array med {days} objekter der matcher schema.

        """;
    }

    public static string EachDay(List<string> fridge, List<string> freezer, List<string> pantry, int persons, List<string> allergies, List<string> shoppinglist, string extraPrompt)
    {
        return $"""
        {RulesPrompt()}

        Generer en ugentlig madplan med præcis 7 opskrifter.
        
        Brug disse dage i madplanen:
        Mandag, Tirsdag, Onsdag, Torsdag, Fredag, Lørdag, Søndag

        Hver dag skal være en opskrift til {persons} personer, hvis det stemmer overens med de andre ønsker fra brugeren.

        {GeneralPrompt(fridge, freezer, pantry, 7, allergies, shoppinglist, extraPrompt)}
        """;
    }

    public static string TwoDay(List<string> fridge, List<string> freezer, List<string> pantry, int persons, List<string> allergies, List<string> shoppinglist, string extraPrompt)
    {
        return $"""
        {RulesPrompt()}

        Generer en ugentlig madplan med præcis 4 opskrifter.

        Brug disse dage i madplanen:
        Mandag, Onsdag, Fredag, Søndag.

        Tilføj IKKE disse dage i madplanen:
        Tirsdag, Torsdag og Lørdag.

        Opskrifterne til mandag, onsdag og fredag skal være en opskrift til {persons*2} personer, hvis det stemmer overens med de andre ønsker fra brugeren.

        Opskriften til søndag skal være en opskrift til {persons} personer, hvis det stemmer overens med de andre ønsker fra brugeren.

        {GeneralPrompt(fridge, freezer, pantry, 4, allergies, shoppinglist, extraPrompt)}
        """;
    }
}